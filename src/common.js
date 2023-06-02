export const getImageUrl = (path) => { 
    return "http://ec2-18-217-185-104.us-east-2.compute.amazonaws.com/travel-frontend/images/"+path 
}
export const getItenararyUrl = (id) => {
    return "./itenararies/"+id
} 
export const getPlaceUrl = (id) => {
    return "./places/"+id
} 
export const getCategory = (id) => {
    return "./itenararies?category="+id
} 