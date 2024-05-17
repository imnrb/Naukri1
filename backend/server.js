// server.js
import app from './app.js';
import cloudinary from 'cloudinary'

const port = process.env.PORT

cloudinary.v2.config({
    cloud_name:process.env.Cloudinary_Client_Name,
    api_key:process.env.Cloudinary_Client_Api,
    secret_key:process.env.Cloudinary_Client_Secret,
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
