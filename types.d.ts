export interface Post {
    caption: string;
    image: {
      asset: {
        _id: string;
        url: string;
      }
    };
    _id: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      _key: string;
      postedBy: {
        _ref: string;
        _id: string;
      };
    }[];
    userId: string;
    receiver: {
      receiverName:string;
      receiverAddress:string;
      receiverPhone: string;
    };
    // isReceived:boolean;
    auctioneers: {
      price:number;
      _key: string;
      postedBy: {
        _ref: string;
        _id: string;
      };
    }[];
    highestPrice:number;
    highestAuctioneer: {
      _id: string;
      userName: string;
      image: string;
    };
    _createdAt: string;
  }
  
export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
    score:number;
  }