

export const allPostsQuery = () => {
    const query = `*[_type == "post"] | order(_createdAt desc)
    {
      _id,
      caption,
      image{
        asset -> {
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
    }`;

    return query;
};
  
  export const postDetailQuery = (postId: string | string[]) => {
    const query = `*[_type == "post" && _id == '${postId}']{
      _id,
      caption,
      image{
          asset -> {
            _id,
            url
          }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
          _ref,
          _id,
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
      auctioneers[]{
        price,
        _key,
        postedBy->{
          _ref,
          _id,
        },
      },
      highestPrice,
      highestAuctioneer->{
        _id,
        userName,
        image
      },
      _createdAt,
    }`;
    return query;
  };
  
  export const searchPostsQuery = (searchTerm: string | string[]) => {
    const query = `*[_type == "post" && caption match '${searchTerm}*' || category match '${searchTerm}*'] {
      _id,
      caption,
      image{
        asset -> {
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
    }`;
    return query;
  };
  
  export const singleUserQuery = (userId: string | string[]) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
  
    return query;
  };
  
  export const allUsersQuery = () => {
    const query = `*[_type == "user"] | order(score desc)`
  
    return query;
  };
  
  export const userCreatedPostsQuery = (userId: string | string[]) => {
    const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
      _id,
      caption,
      image{
        asset -> {
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
    }`;
  
    return query;
  };
  
  export const userLikedPostsQuery = (userId: string | string[]) => {
    const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
      _id,
      caption,
      image{
        asset -> {
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
    }`;
  
    return query;
  };
  
  export const topicPostsQuery = (category: string | string[]) => {
    const query = `*[_type == "post" && category match '${category}*'] | order(_createdAt desc) {
      _id,
      caption,
      image{
        asset -> {
          _id,
          url
        }
      }, 
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
      likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
        },
      },
      receiver{
        receiverName,
        receiverAddress,
        receiverPhone,
      },
    }`;
  
    return query;
  };