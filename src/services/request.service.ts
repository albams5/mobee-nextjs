import {revalidatePath} from "next/cache";
import {getAccessToken} from '@auth0/nextjs-auth0';

export const removeMovie = async (id: number) => {
    // const {accessToken} = await getAccessToken()
    const res = await fetch(`http://localhost:4000/movie/${id}`, {
        method: 'DELETE',
        // headers: {
        //     Authorization: `Bearer ${accessToken}`
        // }
    });
    if (res.ok) {
        revalidatePath('/movies')
    }
}

// export const postNewMovie = async (userID:string, movieData: any) => {
//     // const {accessToken} = await getAccessToken()
//     console.log("dentro de postNewMovie")
//     console.log(movieData)
//     const res = await fetch(`http://localhost:4000/movie/${userID}`, {
//         method: 'POST',
//         body: movieData
//     });
//     if (res.ok) {
//         revalidatePath('/movies')
//     }
// }


export const postNewMovie = async (userID:string, movieData: any) => {
    // const {accessToken} = await getAccessToken()
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
    const res = await fetch(`http://localhost:4000/movie/${userID}`, {
        
        method: 'POST',
        headers: headers,
        mode: "no-cors",
        credentials: "include",
        body: movieData
    });
    if (res.ok) {
        revalidatePath('/movies')
}}

export const getGenres = async() => {
    const dataGenre = await fetch(`http://localhost:4000/genre`);
    const response = await dataGenre.json();
    return response.data;
  }