import { Request, Response } from 'express'
import { execute_procedure } from '../configs/mysql.config';

export const insertarCancionAlbum = async(req: Request, res: Response) => {
    const { id_cancion, id_album } = req.body;
    
    try {
      //guardo al artista en la base de datos
      const insert_result = await execute_procedure('insertarCancionAlbum', {id_cancion, id_album});
      if (insert_result[0].respuesta == 0) return res.status(404).json({content: "La cancion con el id: " + id_cancion + ', no esta dispoible, porque ya se encuentra registrada para un album'});     
  
        
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content: "Se agrego correctamente el ID de la cancion: "+id_cancion+", para el ID del album: "+ id_album
      })
  
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al registrar cancion, '+ error });
    }
  }

export const eliminarCancionAlbum = async(req: Request, res: Response) => {
  const { id_cancion, id_album } = req.body;

  try {
    const delete_result = await execute_procedure('eliminarCancionAlbum', {id_cancion, id_album});
    if (delete_result[0].respuesta == 0) return res.status(404).json({content: "Datos invalidos: ID cancion: " + id_cancion +', ID album: ,'+id_album+' porfavor verificar'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
    content:"Se ah elimino con exito la cancion: " + id_cancion+", para el ID del album: "+ id_album
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al elimnar cancion, '+ error });
  }
}

export const obtenerCancionesAlbum= async(req: Request, res: Response) => {
  const { id_album } = req.body;
  try {
    const get_canciones = await execute_procedure('obtenerCancionesAlbum', {id_album});
    if (get_canciones[0].respuesta == 0) return res.status(404).json({content: "No existe una album registrado con ID: " + id_album +', porfavor registrar previamente'});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_canciones
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener canciones del album , '+ error });
  }
}