import {
    SET_ARTICLE_LIST,
    CLEAR_ARTICLE_LIST,
    SYNC_ARTICLE_LIST,
    SET_GLOBAL_ARTICLE_LIST,
    UPDATE_ARTICLE_VIEWS,
    UPDATE_ARTICLE_LIKES,
    UPDATE_ARTICLE_UNLIKES,
    UPDATE_ARTICLE_LIKE_UNLIKE,
    UPDATE_ARTICLE_RATINGS,
    SET_CATEGORY_TILES,
    SET_ARTICLE_LIST_BY_TYPE,
    SET_SERVER_TIME,
} from '../actions/article';
// import { SET_SEARCH_TEXT } from '../../screens/HomePageScreen';

const categoryTypes = {
    1: "News",
    2: "dc review",
    3: "Culinary Corner",
    4: "Safety & Security",
    5: "People & Culture",
    6: "Training",
}

const initialState = {
    articleList: [],
    articleListItemData: [],
    globalArticleList: [],
    categoryTiles: [],
    searchText: '',
    currentPage: 1,
    totalPages: 0,
    totalListLength: 0,
    articleCountsByType: {
        "News": 0,
        "dc review": 0,
        "Culinary Corner": 0,
        "Safety & Security": 0,
        "People & Culture": 0,
        "Training": 0,
    },
    lastSyncTime: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLE_LIST:
            
            const articleCounts = {
                "News": 0,
                "dc review": 0,
                "Culinary Corner": 0,
                "Safety & Security": 0,
                "People & Culture": 0,
                "Training": 0,
            };
            
            if(action.articleList){
                action.articleList.forEach(article => {
                    if (article.Type in articleCounts) {
                        articleCounts[article.Type]++;
                    }
                });
                
                return {
                    ...state,
                    articleList: Array.isArray(action.articleList) ? action.articleList : [],
                    articleCountsByType: articleCounts,
                    currentPage: action.pagination.CurrentPage,
                    totalPages: action.pagination.TotalPages,
                    totalListLength: action.pagination.TotalListLength,
                    articleCountsByType: articleCounts,
                    lastSyncTime: action.articleList[0].AssignedDate
                };

            }
        case SET_SERVER_TIME:
            return {
                ...state,
                lastSyncTime: action.serverTime
            }
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            }
        case SYNC_ARTICLE_LIST:
            {
                let newList = [...action.articleList, ...state.articleList];

                if(action.articleList[0].AssignedDate){

                    newList.sort((a, b) => new Date(b.AssignedDate) - new Date(a.AssignedDate));
                }else{
                    newList.sort((a, b) => new Date(b.NewsPostId) - new Date(a.NewsPostId));
                }
                
                let updatedList = [];
                let idSet = new Set();
                
                for (const categoryItem of newList) {
                    if (!idSet.has(categoryItem.NewsPostId)) {
                        idSet.add(categoryItem.NewsPostId);
                        let isPostLive = true;
                        if (categoryItem.IsLive !== undefined && categoryItem.IsLive !== null && categoryItem.IsLive === false) {
                            isPostLive = false;
                        }
            
                        if (isPostLive) {
                            updatedList.push(categoryItem);
                        }
                    }
                }
            
                console.log('Sync new List:', updatedList.length);
                return {
                    ...state,
                    articleList: updatedList,
                    lastSyncTime: action.articleList[0].AssignedDate
                };
            }
        case CLEAR_ARTICLE_LIST:
            return {
                articleList: [],
                globalArticleList: [],
                categoryTiles: [],
                searchText: ''
            };
        case SET_GLOBAL_ARTICLE_LIST:
            return {
                ...state,
                globalArticleList: action.globalArticleList
            };
        case UPDATE_ARTICLE_VIEWS:
            {
                const foundIndex = Array.isArray(state.articleList) ? state.articleList.findIndex(x => x.NewsPostId == action.NewsPostId) : -1;
                if (foundIndex > -1) {
                    state.articleList[foundIndex].ViewCount = state.articleList[foundIndex].ViewCount + 1;
                    state.articleList[foundIndex].IsRead = true;
                }

                return {
                    ...state
                };
            }
        case UPDATE_ARTICLE_LIKES:
            {
                const foundIndex = state.articleList.findIndex(x => x.NewsPostId == action.NewsPostId);
                if (action.likeState) {
                    state.articleList[foundIndex].LikeCount = state.articleList[foundIndex].LikeCount + 1;
                    state.articleList[foundIndex].IsUserLiked = true;
                } else {
                    if (state.articleList[foundIndex].LikeCount > 0) {
                        state.articleList[foundIndex].LikeCount = state.articleList[foundIndex].LikeCount - 1;
                        state.articleList[foundIndex].IsUserLiked = false;
                    }
                }
                return {
                    ...state
                };
            }
        case UPDATE_ARTICLE_UNLIKES:
            {
                const foundIndex = state.articleList.findIndex(x => x.NewsPostId == action.NewsPostId);
                if (action.unlLikeState) {
                    state.articleList[foundIndex].UnLikeCount = state.articleList[foundIndex].UnLikeCount + 1;
                    state.articleList[foundIndex].IsUserUnLiked = true;
                } else {
                    if (state.articleList[foundIndex].UnLikeCount > 0) {
                        state.articleList[foundIndex].UnLikeCount = state.articleList[foundIndex].UnLikeCount - 1;
                        state.articleList[foundIndex].IsUserUnLiked = false;
                    }
                }
                return {
                    ...state
                };
            }
        case UPDATE_ARTICLE_LIKE_UNLIKE:
            {
                console.log(action);
                console.log('found index------------');
                const foundIndex = state.articleList.findIndex(x => x.NewsPostId == action.NewsPostId);
                console.log('found index------------', foundIndex);
                state.articleList[foundIndex].IsUserLiked = action.IsUserLiked;
                state.articleList[foundIndex].IsUserUnLiked = action.IsUserUnLiked;
                state.articleList[foundIndex].LikeCount = action.LikeCount;
                state.articleList[foundIndex].UnLikeCount = action.UnlikeCount;
                return {
                    ...state
                };
            }
        case UPDATE_ARTICLE_RATINGS:
            {
                const foundIndex = state.articleList.findIndex(x => x.NewsPostId == action.NewsPostId);
                state.articleList[foundIndex].Rating = action.Rating;
                return {
                    ...state
                };
            }
        case SET_CATEGORY_TILES:
            return {
                ...state,
                categoryTiles: action.categoryTiles,
            };
        case SET_ARTICLE_LIST_BY_TYPE:
            const updatedArticleCounts = { ...state.articleCountsByType };
  
            
            let newList = [];
            let oldList = [];
                if(action.articleList !== null){
                    action.articleList.forEach(article => {
                        if (article.Type in updatedArticleCounts) {
                        updatedArticleCounts[article.Type]++;
                        }
                    });
                for (const categoryItem of action.articleList) {
                    const storedItem = Array.isArray(state.articleList) ? state.articleList.find(v => +v.NewsPostId === +categoryItem.NewsPostId) : null;
                    if (!storedItem) {
                        if(categoryItem.AssignedDate){
                            if (new Date(categoryItem.AssignedDate) > new Date (state.articleList[0].AssignedDate)) {
                                newList.unshift(categoryItem);
                            } else {
                                oldList.push(categoryItem);
                            }

                        }else{
                            if (categoryItem.NewsPostId > state.articleList[0].NewsPostId) {
                                newList.push(categoryItem);
                            } else {
                                oldList.push(categoryItem);
                            }
                        }
                    } else {
                        const foundIndex = state.articleList.findIndex(x => x.NewsPostId == categoryItem.NewsPostId);
                        var isRead = state.articleList[foundIndex].IsRead;
                        state.articleList[foundIndex] = categoryItem;
                        state.articleList[foundIndex].IsRead = isRead;
                    }
                }
                newList.sort((a, b) => new Date(b.AssignedDate) - new Date(a.AssignedDate));
                oldList.sort((a, b) => new Date(b.AssignedDate) - new Date(a.AssignedDate));

                state.articleList = state.articleList.filter(article => {
                        return article.Type !== categoryTypes[action.categoryType] || action.articleList.some(b => b.NewsPostId === article.NewsPostId)
                    }
                );
                       
                return {
                    ...state,
                    currentPage: action.pagination.CurrentPage,
                    totalPages: action.pagination.TotalPages,
                    totalListLength: action.pagination.TotalListLength,
                    articleCountsByType: updatedArticleCounts,
                    articleList: [...newList, ...state.articleList, ...oldList],
                };
            }else{
                state.articleList = state.articleList.filter(article =>  article.Type !== categoryTypes[action.categoryType]);

                return {
                    ...state,
                    articleCountsByType: updatedArticleCounts,
                    articleList: [...state.articleList],
                };
            }
    }
    return state;
};