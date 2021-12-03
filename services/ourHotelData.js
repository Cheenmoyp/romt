import useSWR from 'swr';
import axios from 'axios';

// export default const ourHotelData = axios.get(`${process.env.NEXT_PUBLIC_HOST}/group-hotel-list/2565`).then(response => { 
//     // console.log(response.data.hotels_data); 
//     // return  response.data.hotels_data;
// })
// .catch(error => {
//     console.log('error', error);
// });


export const HotelDetails = (hotel_id) => {

    let hotelDetails = [];
    const { data, error } = useSWR(`${process.env.BE_PUBLIC_HOST}/hotel-details?hotel_id=${hotel_id}`, fetcher)
    
    // console.log(data);
    // return data;
    // if (data && data.result) {
    //     if (isFirstLoad || pageNumber == 1) {
    //        featured_events_arr = data.result.data
    //     }
    //     else{
    //         if ((pageNumber != 0 || pageNumber != 1)) {
    //             featured_events_arr = [...featured_events_arr, ...data.result.data]    
    //         } else {
    //             featured_events_arr = data.result.data
    //         }
    //     }
    //     console.log(featured_events_arr)
    // }
    // return {
    //     eventsData: featured_events_arr,
    //     isLoadingTrips: !error && !data,
    //     totalEventsData: data && data.result && data.result.meta.total,
    //     isErrorTrips: error
    // }
}


