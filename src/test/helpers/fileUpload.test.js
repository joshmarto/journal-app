import cloudinary from 'cloudinary';
import fileUpload from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'de1naugkf', 
    api_key: '866382866425161', 
    api_secret: 'GGXweyDt3dL6uTkeAO2Pf-bWswE',
    secure: true
});

describe('Tests in "fileUpload()" ', () => {
    test('Should upload a file and return the URL', async () => {
        jest.setTimeout(10000);
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            // done();
            Promise.resolve();
        });
    });
    test('Should throw an error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );
        
        expect( url ).toBe( null );
    });
    
});
