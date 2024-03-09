import { BsXLg } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import { RiImageEditFill } from 'react-icons/ri'
import { useState } from 'react'
import ErrorMessage from './ErrorMessage'
import imglyRemoveBackground from "@imgly/background-removal"

const ManageProfile = (props) => {

    const API = process.env.REACT_APP_API_URL

    const [ pfpUploadToggle, setPfpUploadToggle ] = useState(false)
    const [ pfpUploadError, setPfpUploadError ] = useState(false)
    const [ updateBioToggle, setUpdateBioToggle ] = useState(false)
    const [ bioUpdateError, setBioUpdateError ] = useState(false)
    const [ serverError, setServerError ] = useState(false)
    const [ pfpUpload, setPfpUpload ] = useState(null)
    const [ bio, setBio ] = useState(props.player.bio)
    const [ imagePreview, setImagePreview ] = useState('')
    const [ processedImage, setProcessedImage ] = useState(null);
    const [ imageProcessing, setImageProcessing ] = useState(false);

    const inputStyle = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const inputErrorStyle = 'appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const bioInputStyle = 'rounded w-full py-2 text-gray-700 resize-none bg-black text-white h-80 focus:text-black focus:outline-none text-xl'

    async function pfpUploadHandler(e) {
        if(pfpUpload == null) {
            setPfpUploadError(true)
        } else {
            const formData = new FormData();
            formData.append('image', processedImage, 'profile-picture.png');
            const response = await fetch(API + '/users/pfp', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            switch(response.status){
                case 500: {
                    setServerError(true)
                    setPfpUploadError(false)
                    break
                }
                case 400: {
                    setServerError(false)
                    setPfpUploadError(true)
                    break
                }
                case 201: {
                    setServerError(false)
                    setPfpUploadError(false)
                    setPfpUploadToggle(false)
                    props.getProfile()
                    break
                }
            }
        }
    }

    // Function to process a selected image
    async function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (validImageTypes.includes(file.type)) {
            try {
                setImageProcessing(true)
                const dataURL = await readFileAsDataURL(file) 
                const img = await loadImage(dataURL)
                const blob = await imglyRemoveBackground(img.src)
                const processedImg = await loadImage(URL.createObjectURL(blob))
                const boundaries = getContentBoundaries(processedImg)
                const croppedBlob = await cropImageToContent(processedImg, boundaries)
                const croppedImg = await loadImage(URL.createObjectURL(croppedBlob))
                const scaledBlob = await scaleImage(croppedImg, 500, 800)
                setImagePreview(URL.createObjectURL(scaledBlob))
                setProcessedImage(scaledBlob)
            } catch (error) {
                console.error('Failed to remove background:', error)
            } finally {
                setImageProcessing(false)
            }
        } else {
            setPfpUploadError(true)
        }
    }

    // Function to scale an image to fit within the target boundaries
    function scaleImage(img, targetWidth, targetHeight) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const scaleX = targetWidth / img.width;
            const scaleY = targetHeight / img.height;
            const scaleFactor = Math.min(scaleX, scaleY)
            const scaledWidth = img.width * scaleFactor
            const scaledHeight = img.height * scaleFactor
            const offsetX = (targetWidth - scaledWidth) / 2
            const offsetY = targetHeight - scaledHeight
            ctx.clearRect(0, 0, targetWidth, targetHeight)
            ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
            canvas.toBlob(resolve, 'image/png')
        });
    }

    // Function to crop an image to the content boundaries
    function cropImageToContent(img, boundaries) {
        return new Promise((resolve, reject) => {
          if (!boundaries) {
            reject(new Error("No content found for cropping."));
            return;
          }
      
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const width = boundaries.maxx - boundaries.minx + 1
          const height = boundaries.maxy - boundaries.miny + 1
      
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, -boundaries.minx, -boundaries.miny)
      
          canvas.toBlob(blob => resolve(blob), 'image/png')
        })
      }

    // Function to find the boundaries of the main content in an image
    function getContentBoundaries(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const width = imageData.width;
        const height = imageData.height;

        // Function to check if a pixel is part of the main content (not transparent)
        function isPixelFilled(x, y) {
            return data[(y * width + x) * 4 + 3] > 0;
        }

        // Array to keep track of visited pixels
        const visited = new Array(width * height).fill(false);

        // Function to perform flood fill and return the size of the filled area and its boundaries
        function floodFill(x, y) {
            if (x < 0 || y < 0 || x >= width || y >= height || visited[y * width + x] || !isPixelFilled(x, y)) {
                return { size: 0, boundaries: { minx: Infinity, maxx: -Infinity, miny: Infinity, maxy: -Infinity } };
            }

            visited[y * width + x] = true;

            const boundaries = { minx: x, maxx: x, miny: y, maxy: y };
            const stack = [[x, y]];
            let size = 1;

            while (stack.length) {
                const [cx, cy] = stack.pop();

                [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]].forEach(([nx, ny]) => {
                    if (nx >= 0 && ny >= 0 && nx < width && ny < height && !visited[ny * width + nx] && isPixelFilled(nx, ny)) {
                        visited[ny * width + nx] = true;
                        size++;
                        boundaries.minx = Math.min(boundaries.minx, nx);
                        boundaries.maxx = Math.max(boundaries.maxx, nx);
                        boundaries.miny = Math.min(boundaries.miny, ny);
                        boundaries.maxy = Math.max(boundaries.maxy, ny);
                        stack.push([nx, ny]);
                    }
                });
            }

            return { size, boundaries };
        }

        let largestComponent = { size: 0, boundaries: { minx: 0, maxx: 0, miny: 0, maxy: 0 } };

        // Iterate through each pixel to find the largest connected component
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (!visited[y * width + x] && isPixelFilled(x, y)) {
                    const result = floodFill(x, y);
                    if (result.size > largestComponent.size) {
                        largestComponent = result;
                    }
                }
            }
        }

        // Return the boundaries of the largest component
        return largestComponent.boundaries;
    }
      
    // Utility function to read a file as a data URL
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject
            reader.readAsDataURL(file)
        });
    }
      
    // Utility function to load an image
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        });
    }

    // Bio Update Handler
    async function bioUpdateHandler(e) {
        const formData = new FormData(e.target)
        const bio = formData.get('bio')
        const response = await fetch(API + '/users/', {
            method: 'PATCH',
            body: JSON.stringify({
                bio: bio
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        props.getProfile()
    }  

    return (
        <>         
        <div className='grid grid-cols-3 gap-3 justify-center m-4 scale-100 lg:scale-75'>
            {/* Profile Image */}
            <div className='col-span-3 lg:col-span-1 justify-center relative my-auto'>
                { pfpUploadToggle ?
                <div className='flex justify-center w-full'>
                    <form className='px-8 pt-6 pb-8 relative' onSubmit={ async (e) => {
                        e.preventDefault()
                        pfpUploadHandler(e)
                    }}> 
                        {imageProcessing ? 
                        <div className='text-center my-5'>
                            <div className='loader m-auto'/>
                            <div className='text-5xl text-osu r6-font my-3'>Processing Image</div>
                            <div className='text-4xl text-white r6-font mt-3'>This will take a moment.</div>
                        </div>
                        :
                        <>
                        <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0' onClick={ async (e) => {
                            setPfpUploadToggle(false)
                        }}><BsXLg /></button>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-white text-sm font-bold mb-2' htmlFor='upload'>Upload Profile Image</label>
                            <input className={pfpUploadError ? inputErrorStyle : inputStyle} onChange={e => {setPfpUpload(e.target.files); setPfpUploadError(false); handleImageChange(e)}} id='upload' name='image' type='file'/>
                            <p className='mt-1 text-sm text-gray-500' id='file_input_help'>PNG or JPG</p>
                            {pfpUploadError && <ErrorMessage>Please select a PNG or JPG file</ErrorMessage>}
                            {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                        </div>
                        <div className='my-5'>
                        {imagePreview ? (  
                            <>
                            <img className='' src={imagePreview} alt='Resized preview' />
                            </>
                        ) : (
                            <img className='m-auto' src={API + props.player.pfp} onError={(e) => {e.target.src = './images/placeholder.png'}}/>
                        )}
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-osu hover:bg-osu-dark font-semibold text-white shadow-sm py-2 px-4 rounded inline-flex items-center' type='submit'>
                                <svg className='fill-current w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' transform='matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)'><path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z'/></svg>
                                <span>Upload</span>
                            </button>
                        </div>
                        </>
                        }
                    </form>
                </div>
                :
                <>
                <img className='m-auto' src={API + props.player.pfp} onError={(e) => {e.target.src = './images/placeholder.png'}}/>
                <div className='flex'>
                    <button className='rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold shadow-sm scale-150 text-osu hover:text-white mx-auto my-2' onClick={ async (e) => {
                        setPfpUploadToggle(true)
                    }} ><span className='flex text-xl mt-1'><div className='my-auto'><RiImageEditFill /></div><div className='mx-1'>Change</div></span></button>
                </div>
                </>
                }
            </div>

            {/* User Bio */}
            <div className='col-span-3 lg:col-span-2 my-auto'>
                <div className=' w-full h-full bg-black p-4 rounded text-white text-2xl relative'>
                    <div className='clip-title pb-4'>
                        {props.player.firstName} {props.player.lastName}
                    </div>  
                    { updateBioToggle ?
                    <form className='relative flex flex-wrap justify-center' onSubmit={ async (e) => {
                        e.preventDefault()
                        setUpdateBioToggle(false)
                        bioUpdateHandler(e)
                    }}>
                        <div className='mb-4 w-full border border-white rounded py-2 px-3'>
                            <textarea className={bioUpdateError || serverError ? inputErrorStyle : bioInputStyle} value={bio} onChange={e => setBio(e.target.value) } id='bio' name='bio' placeholder={props.player.bio}/>
                            <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0 text-xl' onClick={ async (e) => {
                                setUpdateBioToggle(false)
                                setBio(props.player.bio)
                            }}><BsXLg /></button>
                        </div>
                        <div className='w-full'>
                            <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm float-right' type='submit'>Update</button>
                        </div>
                    </form>
                    :
                    <>
                    <div className='flex'>
                        <button className='bg-transparent font-semibold text-osu hover:text-white shadow-sm mx-auto mb-2' onClick={ async (e) => {
                            setUpdateBioToggle(true),
                            setBio(props.player.bio)
                        }} ><span className='flex'><div className='my-auto'><BiEditAlt /></div> Edit Bio</span></button>
                    </div>
                    <div className='whitespace-pre-line text-center text-2xl'>
                        {props.player.bio}
                    </div>
                    </>
                    }
                </div>
            </div>
        </div>
        </>
    )}
    export default ManageProfile