import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';

export const insertarAlbum = async(req: Request, res: Response) => {
    const { id_artista, nombre, descrip, nombreFoto, foto } = req.body;
    let ulrFoto= '-';

    try {
        const insert_result = await execute_procedure('insertarAlbum', { id_artista, nombre, descrip, ulrFoto });
        if (insert_result[0].respuesta == 0) return res.status(404).json({content: "Ya existe un album registrado con el nombre: " + nombre + ', para el id de artista: '+id_artista});     
        
        //subo la imagen al bucket se se desea
        if ((nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');      
            
            //edito la cancion en la base de datos
            const id_album = insert_result[0].respuesta;
            ulrFoto = resultS3.url;
            await execute_procedure('editarFotoAlbum', {id_album, ulrFoto});
        }

            //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:{
            id_album: insert_result[0].respuesta,
            id_artista,
            nombre,
            descrip,
            foto: ulrFoto
            } 
        });
        
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al registrar album, '+ error });
    }
}

export const editarAlbum = async(req: Request, res: Response) => {
    const { id_artista, id_album, nombre, descrip, nombreFoto, foto} = req.body;
    
    try {
        //guardo al Artista en la base de datos
        const update_result = await execute_procedure('editarAlbum', {id_artista, id_album, nombre, descrip});
        if (update_result[0].respuesta == 0) return res.status(404).json({content: 'Datos invalidos, puede ser que el nombre: '+nombre+' no este disponible o que el artista con el ID: ' + id_artista  +' no este registrado, porfavor registrar previamente'});
        
        //subo la imagen al bucket se se desea
        if ((nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
            
            //edito la cancion en la base de datos
            const ulrFoto = resultS3.url;
            await execute_procedure('editarFotoAlbum', {id_album, ulrFoto});
        }

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ah actualizado con exito el Album: " + nombre
        })
        
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al editar album, '+ error });
    }
}

export const eliminarAlbum = async(req: Request, res: Response) => {
    const { id_album } = req.body;

    try {
        const delete_result = await execute_procedure('eliminarAlbum', {id_album});
        if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe una cancion registrado con ID: " + id_album +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content:"Se ah elimino con exito el album: " + id_album
        })
      } catch (error) {
        res.status(500).json({ content: 'Internal Error al elimnar album, '+ error });
      }

}

export const  obtenerAlbumxNombre = async(req: Request, res: Response) => {
    const { nombre } = req.body

    try {
        const get_album = await execute_procedure('obtenerAlbumxNombre', {nombre});
        if (get_album[0].respuesta == 0) return res.status(404).json({content: "No existe un album registrado con nombre: " + nombre +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_album
        });

    } catch (error) {   
        res.status(500).json({ content: 'Internal Error al obtener album, '+ error });
    }
}   

export const  obtenerAlbumxId = async(req: Request, res: Response) => {
    const { id_album } = req.body

    try {
        const get_album = await execute_procedure('obtenerAlbumxId', {id_album});
        if (get_album[0].respuesta == 0) return res.status(404).json({content: "No existe un album registrado con ID: " + id_album +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_album
        });

    } catch (error) {   
        res.status(500).json({ content: 'Internal Error al obtener album, '+ error });
    }
}

export const obtenerAlbumsArtista = async(req: Request, res: Response) => {
    const { id_artista } = req.body;

    try {
        const get_albums = await execute_procedure('obtenerAlbumsArtista', {id_artista});
        if (get_albums[0].respuesta == 0) return res.status(404).json({content: "No existe una artista registrado con ID: " + id_artista +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_albums
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener albums del artista, '+ error });
    }
}

export const obtenerAlbums = async(req: Request, res: Response) => {
    try {
        const get_Albums = await execute_procedure('obtenerAlbums');
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_Albums
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener Albums, '+ error });
    }
}

