import { Request, Response } from 'express'
import { execute_procedure } from '../configs/mysql.config';

export const insertarCancionPlaylist = async(req: Request, res: Response) => {
    const { id_cancion, id_playlist } = req.body;
    
    try {
      //guardo al artista en la base de datos
      const insert_result = await execute_procedure('insertarCancionPlaylist', {id_cancion, id_playlist});
      if (insert_result[0].respuesta == 0) return res.status(404).json({content: "La cancion con el ID: " + id_cancion + ', ya se encuentra registrada para el ID Playlist: '+ id_playlist});     
    
        
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content: "Se agrego correctamente el ID de la cancion: "+id_cancion+", para el ID del Playlist: "+ id_playlist
      })
  
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al registrar cancion, '+ error });
    }
}

export const eliminarCancionPlaylist = async(req: Request, res: Response) => {
    const { id_cancion, id_playlist } = req.body;

    try {
        const delete_result = await execute_procedure('eliminarCancionPlaylist', {id_cancion, id_playlist});
        if (delete_result[0].respuesta == 0) return res.status(404).json({content: "Datos invalidos: ID cancion: " + id_cancion +', ID Playlist: ,'+id_playlist+' porfavor verificar'});

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
        content:"Se elimino con exito la cancion: " + id_cancion+", para el ID del Playlist: "+ id_playlist
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al elimnar cancion, '+ error });
    }
}

export const obtenerCancionesPlaylist= async(req: Request, res: Response) => {
    const { id_playlist } = req.body;
    try {
      const get_canciones = await execute_procedure('obtenerCancionesPlaylist', {id_playlist});
      if (get_canciones[0].respuesta == 0) return res.status(404).json({content: "No existe una Playlist registrado con ID: " + id_playlist +', porfavor registrar previamente'});
  
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content: get_canciones
      })
    } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener canciones del Playlist , '+ error });
    }
}