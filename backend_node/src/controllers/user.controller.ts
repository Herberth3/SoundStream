import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';

export const editarUsuario = async(req: Request, res: Response) => {
    const { nombres, apellidos, email, nombreFoto, foto} = req.body;

    try {
        //guardo al usuario en la base de datos
        const update_result = await execute_procedure('editarUsuario', {nombres, apellidos, email});
        if (update_result[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con el correo: " + email +', porfavor registrate previamente'});
        
        //subo la imagen al bucket si se desea
        if (update_result[0].respuesta == 1 && (nombreFoto != '') && (foto != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');     

             //edito al artista en la base de datos
            const ulrFoto = resultS3.url;
            await execute_procedure('editarFotoUsuario', {email, ulrFoto});
        }

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ah actualizado con exito el usuario a " + nombres +" "+ apellidos
        })
    }  catch (error) {
        res.status(500).json({ content: 'Internal Error al editar usuario, '+ error });
    }
}

export const obtenerUsuario = async(req: Request, res: Response) => {
    const { email } = req.body;
    
    try {
        const get_user = await execute_procedure('obtenerUsuario', {email});
        if (get_user[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con el correo: " + email +', porfavor registrate previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_user
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener usuario, '+ error });
    }
}

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
} 
