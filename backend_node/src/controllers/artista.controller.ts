import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';


export const insertarArtista = async(req: Request, res: Response) => {
    const { nombre, fecha, nombreFoto, foto} = req.body;
    let ulrFoto = '-'; 
  
    try {
        //guardo al artista en la base de datos
        const insert_result = await execute_procedure('insertarArtista', { nombre, ulrFoto, fecha });
        if (insert_result[0].respuesta == 0) return res.status(404).json({content: "Ya existe un artista registrado con el nombre: " + nombre });     
        
        //subo la imagen al bucket se se desea
        if ((nombreFoto != '') && (foto != '')){
          const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
          console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');      
          
          //edito al artista en la base de datos
          ulrFoto = resultS3.url;
          const id_artista = insert_result[0].respuesta;
          await  execute_procedure('editarFotoArtista', {id_artista, ulrFoto});
        }       
        
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content:{
            id_artista: insert_result[0].respuesta,
            nombre, 
            fecha,
            foto: ulrFoto
        } 
      })
      
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al registrar artista, '+ error });
    }
}

export const editarArtista = async (req: Request, res: Response) => {
    const {id_artista, nombre, nombreFoto, foto} = req.body;
    
    try {
        //guardo al Artista en la base de datos
        const update_result = await execute_procedure('editarArtista', {id_artista, nombre});
        if (update_result[0].respuesta == 0) return res.status(404).json({content: 'Datos invalidos, puede ser que el nombre: '+nombre+' no este disponible o que el artista con el ID: ' + id_artista  +' no este registrado, porfavor registrar previamente'});
        
        //subo la imagen al bucket si se desea
        if (update_result[0].respuesta == 1 && (nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');

            //edito al artista en la base de datos
            const ulrFoto = resultS3.url;
            await  execute_procedure('editarFotoArtista', {id_artista, ulrFoto});
        }

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ha actualizado con exito el Artista: " + nombre
        })
    }  catch (error) {
        res.status(500).json({ content: 'Internal Error al editar Artista, '+ error });
    }
}

export const eliminarArtista = async(req: Request, res: Response) => {
    const { id_artista } = req.body;
    
    try {
        const delete_result = await execute_procedure('eliminarArtista', {id_artista});
        if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe un artista registrado con el id: " + id_artista +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ha eliminado con exito el Artista, ID: " + id_artista
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al eliminar artista, '+ error });
    }
}

export const obtenerArtistaxNombre = async(req: Request, res: Response) => {
    const { nombre } = req.body;
    
    try {
        const get_artistas = await execute_procedure('obtenerArtistaxNombre', {nombre});
        if (get_artistas[0].respuesta == 0) return res.status(404).json({content: "No existe un artista registrado con el nombre: " + nombre +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_artistas
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener artista, '+ error });
    }
}

export const obtenerArtistaxId = async(req: Request, res: Response) => {
    const { id_artista } = req.body;
    
    try {
        const get_artistas = await execute_procedure('obtenerArtistaxId', {id_artista});
        if (get_artistas[0].respuesta == 0) return res.status(404).json({content: "No existe un artista registrado con el id: " + id_artista +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_artistas
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener artista, '+ error });
    }
}

export const obtenerArtistas = async(req: Request, res: Response) => {
    try {
      const get_artistas = await execute_procedure('obtenerArtistas');
  
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content: get_artistas
      })
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al obtener artistas, '+ error });
    }
}

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ mscontentg: 'true' })
} 
