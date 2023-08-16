//this class represents a single post and its data associated
import UserClass from './UserClass';

class Post {

    constructor(user, thePost){
        this.user = user; //not sure if this should be the whole user object or just their username?
        this.likes = 0;
        this.thePost = thePost; //this can be a string for now to keep it simple, but will eventually be a video
    }

    addLike() {
        this.followers ++;
    }
    removeLike() {
        this.followers --;
    }

    //again we could use this format if we find it easier to work with
    // updateLikes(updatedLikes) {
    //     this.likes = updatedLikes;
    // }


}

export default Post;