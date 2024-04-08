import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';

export const insertarPlaylist = async(req: Request, res: Response) => {
    const { id_usuario, nombre, descrip, nombreFoto, foto } = req.body;
    let ulrFoto= '-';

    try {
        const insert_result = await execute_procedure('insertarPlaylist', { id_usuario, nombre, descrip, ulrFoto });     

        if ((nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');      
            
            //edito la cancion en la base de datos
            const id_Playlist = insert_result[0].respuesta;
            ulrFoto = resultS3.url;
            await execute_procedure('editarFotoPlaylist', {id_Playlist, ulrFoto});
        }

            //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:{
            id_Playlist: insert_result[0].respuesta,
            id_usuario,
            nombre,
            descrip,
            foto: ulrFoto
            } 
        });
        
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al registrar Playlist, '+ error });
    }
}

export const editarPlaylist = async(req: Request, res: Response) => {
    const { id_playlist, nombre, descrip, nombreFoto, foto} = req.body;
    
    try {
        //guardo al usuario en la base de datos
        const update_result = await execute_procedure('editarPlaylist', {id_playlist, nombre, descrip});
        if (update_result[0].respuesta == 0) return res.status(404).json({content: "No existe un playlist registrado con el ID: " + id_playlist +', porfavor registrate previamente'});
        
        //subo la imagen al bucket se se desea
        if ((nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');        
            
            //edito la cancion en la base de datos
            const ulrFoto = resultS3.url;
            await execute_procedure('editarFotoPlaylist', {id_playlist, ulrFoto});
        }

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ah actualizado con exito el Playlist: " + nombre
        })
        
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al editar Playlist, '+ error });
    }
}

export const eliminarPlaylist = async(req: Request, res: Response) => {
    const { id_playlist } = req.body;

    try {
        const delete_result = await execute_procedure('eliminarPlaylist', {id_playlist});
        if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe un palylist registrado con ID: " + id_playlist +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content:"Se ah elimino con exito el Playlist: " + id_playlist
        })
    } catch (error) {
    res.status(500).json({ content: 'Internal Error al elimnar Playlist, '+ error });
    }
}

export const  obtenerPlaylistxId = async(req: Request, res: Response) => {
    const { id_playlist } = req.body

    try {
        const get_Playlist = await execute_procedure('obtenerPlaylistxId', {id_playlist});
        if (get_Playlist[0].respuesta == 0) return res.status(404).json({content: "No existe un Playlist registrado con ID: " + id_playlist +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_Playlist
        });

    } catch (error) {   
        res.status(500).json({ content: 'Internal Error al obtener Playlist, '+ error });
    }
}

export const obtenerPlaylistsUsario = async(req: Request, res: Response) => {
    const { id_usuario } = req.body;

    try {
        const get_Playlists = await execute_procedure('obtenerPlaylistsUsario', {id_usuario});
        if (get_Playlists[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con ID: " + id_usuario +', porfavor registrar previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_Playlists
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener Playlists del usuario, '+ error });
    }
}

export const obtenerPlaylists = async(req: Request, res: Response) => {
    try {
        const get_Playlists = await execute_procedure('obtenerPlaylists');
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
          content: get_Playlists
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener Playlists, '+ error });
    }
}