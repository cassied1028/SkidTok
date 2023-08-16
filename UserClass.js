//this class represents a single user and the data associated with them

class User {

    constructor(username) {
      this.username = username;
      //set these to 0 when creating a new account
      this.followers = 0;
      this.following = 0;
      this.posts = []
    }

    //these methods will be used when someone other than the user themself follows or unfollows this user
    addFollower() {
        this.followers ++;
    }
    removeFollower() {
        this.followers ++;
    }

    // *** another way we could write these *****
    // updateFollowers(updatedFollowers) {
    //     this.followers = updatedFollowers;
    // }

    //these methods would be called when the user themself follows or unfollows another user
    addFollowing() {
        this.followers ++;
    }
    removeFollowing() {
        this.followers --;
    }

  }
  
  export default User;
  