import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';

export const insertarCancion = async(req: Request, res: Response) => {
  const { id_artista, nombre, nombreFoto, foto, duracion, nombreCancion, mp3} = req.body;
  let ulrFoto= '-'; let urlCancion= '-'; const enblanco = '-'; 

  try {
    //guardo al artista en la base de datos
    const insert_result = await execute_procedure('insertarCancion', {id_artista, nombre, ulrFoto, enblanco, urlCancion});
    if (insert_result[0].respuesta == 0) return res.status(404).json({content: "Ya existe una cancion registrada con el nombre: " + nombre + ', para el id de artista: '+id_artista});     
    
    //subo la imagen al bucket se se desea
    if ((nombreFoto != '') && (foto != '')){
      const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
      
      //edito la cancion en la base de datos
      ulrFoto = resultS3.url;
      const id_cancion = insert_result[0].respuesta;
      await execute_procedure('editarFotoCancion', {id_cancion, ulrFoto});
    }

    if ((duracion != '') && (nombreCancion != '') && (mp3 != '')){
      const resultS3 = await uploadS3Base64('musica/', nombreCancion, mp3, 'audio/mpeg');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
      
      //edito la cancion en la base de datos
      urlCancion = resultS3.url;
      const id_cancion = insert_result[0].respuesta;
      await execute_procedure('editarMp3Cancion', {id_cancion, duracion, urlCancion});
    }    
      
    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content:{
        id_cancion: insert_result[0].respuesta,
        id_artista,
        nombre, 
        foto: ulrFoto,
        duracion,
        mp3: urlCancion
      } 
    })

  } catch (error) {
    res.status(500).json({ content: 'Internal Error al registrar cancion, '+ error });
  }
}

export const editarCancion = async (req: Request, res: Response) => {
  const {id_artista, id_cancion, nombre, nombreFoto, foto, duracion, nombreCancion, mp3} = req.body;
  
  try {
    //guardo al Artista en la base de datos
    const update_result = await execute_procedure('editarCancion', {id_artista, id_cancion, nombre});
    if (update_result[0].respuesta == 0) return res.status(404).json({content: 'Datos invalidos, puede ser que el nombre: '+nombre+' no este disponible o que el artista con el ID: ' + id_artista  +' no este registrado, porfavor registrar previamente'});
    
    //subo la imagen al bucket se se desea
    if ((nombreFoto != '') && (foto != '')){
      const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
      
      //edito la cancion en la base de datos
      const ulrFoto = resultS3.url;
      await execute_procedure('editarFotoCancion', {id_cancion, ulrFoto});
    }

    if ((duracion != '') && (nombreCancion != '') && (mp3 != '')){
      const resultS3 = await uploadS3Base64('musica/', nombreCancion, mp3, 'audio/mpeg');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
      
      //edito la cancion en la base de datos
      const ulrMp3 = resultS3.url;
      await execute_procedure('editarMp3Cancion', {id_cancion, duracion, ulrMp3});
    }  

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content:"Se ah actualizado con exito el Artista: " + nombre
    })
  }  catch (error) {
    res.status(500).json({ content: 'Internal Error al editar cancion, '+ error });
  }
}

export const eliminarCancion = async(req: Request, res: Response) => {
  const { id_cancion } = req.body;
  
  try {
    const delete_result = await execute_procedure('eliminarCancion', {id_cancion});
    if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe una cancion registrado con ID: " + id_cancion +', porfavor registrar previamente'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content:"Se ah elimino con exito la cancion con ID: " + id_cancion
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al elimnar cancion, '+ error });
  }
}

export const obtenerCancionxNombre = async(req: Request, res: Response) => {
  const { nombre } = req.body;
  
  try {
    const get_cancion = await execute_procedure('obtenerCancionxNombre', {nombre});
    if (get_cancion[0].respuesta == 0) return res.status(404).json({content: "No existe una cancion registrado con el nombre: " + nombre +', porfavor registrar previamente'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_cancion
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener cancion, '+ error });
  }
}

export const obtenerCancionxId = async(req: Request, res: Response) => {
  const { id_cancion } = req.body;
  
  try {
    const get_cancion = await execute_procedure('obtenerCancionxId', {id_cancion});
    if (get_cancion[0].respuesta == 0) return res.status(404).json({content: "No existe una cancion registrado con ID: " + id_cancion +', porfavor registrar previamente'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_cancion
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener cancion, '+ error });
  }
}

export const obtenerCancionesArtista = async(req: Request, res: Response) => {
  const { id_artista } = req.body;
  
  try {
    const get_canciones = await execute_procedure('obtenerCancionesArtista', {id_artista});
    if (get_canciones[0].respuesta == 0) return res.status(404).json({content: "No existe una artista registrado con ID: " + id_artista +', porfavor registrar previamente'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_canciones
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener canciones del artista, '+ error });
  }
}

export const obtenerCanciones = async(req: Request, res: Response) => {
  try {
    const get_canciones = await execute_procedure('obtenerCanciones');

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_canciones
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener canciones, '+ error });
  }
}

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ mscontentg: 'true' })
} 
