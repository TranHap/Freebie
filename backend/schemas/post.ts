export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
      {
        name:'image',
        title:'Image',
        type:'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }],
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'receiver',
        title:'Receiver',
        type: 'receiver'
      },
      {
        name: 'auctioneers',
        title: 'Auctioneers',
        type: 'array',
        of: [{type: 'auctioneers'}],
      },
      {
        name:'highestPrice',
        title: 'HighestPrice',
        type:'number',
      },
      {
        name:'highestAuctioneer',
        title:'HighestAuctioneer',
        type: 'reference',
        to: [{ type: 'user' }],
      }
    ],
  };