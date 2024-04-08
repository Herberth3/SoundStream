import { AwsConfig, S3Params, S3ParamsGetFile } from '../interfaces/aws.interface';
import aws from 'aws-sdk'

const configS3: AwsConfig = {
    region         : process.env.AWS_REGION as string,
    accessKeyId    : process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
};
aws.config.update(configS3)
const s3 = new aws.S3();

export const uploadS3Base64 = async (pathS3: string, namefile:string, filebase64: string, ContentType:S3Params["ContentType"]) => {

    if (!pathS3 || !namefile || !filebase64) return {ok:false, message: 'Upload fail, Error: Invalid request', url:''}

    const urlFileS3 = `${pathS3}${namefile}`;
    const bufferFileS3 = Buffer.from(filebase64, 'base64'); // Convertir la imagen de base 64 a un buffer

    const params: S3Params = {
        Bucket     : process.env.AWS_BUCKET_NAME as string,
        Key        : urlFileS3,
        Body       : bufferFileS3,
        ContentType
    };

    const urlBucketFile = (await s3.upload(params).promise()).Location; 
    //console.log(urlBucketFile);
    return {ok:true, message: 'Upload succesfully :)', url: urlBucketFile}
};

export const downloadS3Base64 = (pathS3: string, namefile:string) => {

    if (!pathS3 || !namefile) return {message: 'Download fail: Invalid request', ok:false,  data:{}}

    const urlFileS3 = `${pathS3}/${namefile}`;

    const paramsGetFileS3: S3ParamsGetFile = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key   : urlFileS3
    };
    
    s3.getObject(paramsGetFileS3, (err: aws.AWSError, data: aws.S3.GetObjectOutput) => {
        if (err)  return {message: 'Download fail: '+ err, ok:false, data:{}}
        const filebase64 = Buffer.from(data.Body as Buffer).toString('base64'); // Parser el file a base64
        return {message: 'Download succesfully :)', ok:true, data:filebase64};
    });
    
};

export const uploadS3Mp3 = async (nameMp3: string, mp3: Express.Multer.File) => {
    
    if ( !nameMp3 || !mp3 ) return {message: 'Upload mp3 fail: Invalid request', ok:false, url:''};
    
    const urlMp3 = `musica/${nameMp3}.mp3`;
    const bufferMp3 = mp3.buffer as Buffer;
    
    const params: S3Params = {
        Bucket     : process.env.AWS_BUCKET_NAME as string,
        Key        : urlMp3,
        Body       : bufferMp3,
        ContentType: 'audio/mpeg'
    }
    
    const urlBucketFile = (await s3.upload(params).promise()).Location; 
    console.log(urlBucketFile);
    return {message: 'Upload mp3 succesfully :)', ok:true, url: urlBucketFile}

};


