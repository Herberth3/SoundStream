import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import {uploadS3Base64} from '../configs/s3.config' 
import {execute_procedure} from '../configs/mysql.config'

export const insertarUsuario = async (req: Request, res: Response) => {
  let { nombres, apellidos, email, contra, fecha, nombreFoto, foto} = req.body;
  let ulrFoto = '-'; 

  try {
    //ecriptart la contrasena
    if (!!contra) contra = bcrypt.hashSync(contra, 10);
  
    //guardo al usuario en la base de datos
    const insert_result = await execute_procedure('insertarUsuario', {nombres, apellidos, email, contra, fecha, ulrFoto});
    if (insert_result[0].respuesta == 0) return res.status(404).json({content: "Ya existe un usuario registrado con el correo: " + email });
  
    //subo la imagen al bucket se se desea
    if ((nombreFoto != '') && (foto != '')){
      const resultS3 = await uploadS3Base64('fotos/', nombreFoto, foto, 'image');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');     

      //edito al usuario en la base de datos
      ulrFoto = resultS3.url;
      await execute_procedure('editarFotoUsuario', {email, ulrFoto});
    }

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content:{
        id_usario: insert_result[0].respuesta,
        nombres, 
        apellidos, 
        email, 
        contra, 
        fecha,
        foto: ulrFoto
      } 
    })
    
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al registrar usuario, '+ error });
  }
}

export const login = async(req: Request, res: Response) => {
  const { email, contra} = req.body;

  try {
    //obtengo al usuario de la base de datos
    const get_user = await execute_procedure('obtenerUsuario', {email});
    if (get_user[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con el correo: " + email +', porfavor registrate previamente'});

    //valido la contrasena encriptada con la entrante
    const validatePassword = !contra ? false : bcrypt.compareSync(contra, get_user[0].contra);
    if (!validatePassword) return res.status(404).json({content: "Datos Invalidos, intente de nuevo"});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_user
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al autenticar usuario, '+ error });
  }
}

export const healthy = (req: Request, res: Response) => {
  return res.status(200).json({ msg: 'true' })
} 
