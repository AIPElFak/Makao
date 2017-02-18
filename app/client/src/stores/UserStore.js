import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
    constructor() {
        this.bindActions(UserActions);
        this.username = '';
        this.id = '';
        this.friends = [];
    }

    updateUserInfo(info) {
        this.username = info.username;
        this.id = info.id;
    }

    updateFriendList(newFriend) {
        this.friends.push(newFriend);
    }

    receiveInvite(inviter) {

    }

    clearUser() {
        this.username = '';
        this.id = '';
        this.friends = [];
    }
}

export default alt.createStore(UserStore);
