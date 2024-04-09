import AsyncStorage from '@react-native-async-storage/async-storage'
import { menuItems } from '../../mockData/mockMenuItems';
import { setSidebarMenuSet, setStoreCategory } from '../../handlers/menu.handler';
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';
export const SET_GLOBAL_ARTICLE_LIST = 'SET_GLOBAL_ARTICLE_LIST';
export const CLEAR_ARTICLE_LIST = 'CLEAR_ARTICLE_LIST';
export const SYNC_ARTICLE_LIST = 'SYNC_ARTICLE_LIST';
export const UPDATE_ARTICLE_VIEWS = 'UPDATE_ARTICLE_VIEWS';
export const UPDATE_ARTICLE_LIKES = 'UPDATE_ARTICLE_LIKES';
export const UPDATE_ARTICLE_UNLIKES = 'UPDATE_ARTICLE_UNLIKES';
export const UPDATE_ARTICLE_LIKE_UNLIKE = 'UPDATE_ARTICLE_LIKE_UNLIKE';
export const UPDATE_ARTICLE_RATINGS = 'UPDATE_ARTICLE_RATINGS';
export const SET_CATEGORY_TILES = 'SET_CATEGORY_TILES'
export const SET_ARTICLE_LIST_BY_TYPE = 'SET_ARTICLE_LIST_BY_TYPE';
export const SET_SERVER_TIME = 'SET_SERVER_TIME';

export const fetchArticleList = (userId, OrganizationID, search, type) => {
    return async dispatch => {
        console.log('Going to fetchArticleList by userId:', userId);
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        const response = await fetch(
            `${APIUrl}api/GatewayMobile/GetUserContentListV2`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId,
                    "ContentType": type,
                    "Search": search,
                    "CurrentPage": 1,
                    "ListLength": 100,
                    "OrganizationID": OrganizationID
                })
            }
        );

        const resData = await response.json();
        const articleList = resData.ContentList
        if (search == '') {
            dispatch({ type: SET_ARTICLE_LIST, articleList: articleList, pagination: resData.PaginationInfo });
        } else {
            dispatch({ type: SET_GLOBAL_ARTICLE_LIST, globalArticleList: articleList, pagination: resData.PaginationInfo });
        }
    };
};

export const fetchArticleItemListAdmin = (userId, OrganizationID, search, type) => {
    return async dispatch => {
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        const response = await fetch(
            `${APIUrl}api/GatewayMobile/GetNewsPostListV2`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId,
                    "PublishState": "Published",
                    "ApproveState": "Approved",
                    "Type": "",
                    "TypeId": type,
                    "Search": search,
                    "CurrentPage": 1,
                    "ListLength": 100,
                    "OrganizationID": OrganizationID
                })
            }
        );

        const resData = await response.json();
        const articleList = resData.NewsPostList

        if (search == '') {
            dispatch({ type: SET_ARTICLE_LIST, articleList: articleList, pagination: resData.PaginationInfo });
        } else {
            dispatch({ type: SET_GLOBAL_ARTICLE_LIST, globalArticleList: articleList, pagination: resData.PaginationInfo });
        }
    };
};

export const fetchArticleListByTypeAdmin = (userId, OrganizationID, search, type, page, listLength) => {
    return async dispatch => {
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        const response = await fetch(
            `${APIUrl}api/GatewayMobile/GetNewsPostListV2`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId,
                    "PublishState": "Published",
                    "ApproveState": "Approved",
                    "Type": "",
                    "TypeId": type,
                    "Search": search,
                    "CurrentPage": page,
                    "ListLength": listLength,
                    "OrganizationID": OrganizationID
                })
            }
        );

        const resData = await response.json();
        const articleList = resData.NewsPostList

        dispatch({ type: SET_ARTICLE_LIST_BY_TYPE, articleList: articleList, pagination: resData.PaginationInfo, categoryType: type });
    };
};

export const fetchUserArticleListByScroling = (userId, OrganizationID, search, type, page, listLength) => {
    return async dispatch => {
        console.log('Going to fetchArticleList by userId:', userId);
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        const response = await fetch(
            `${APIUrl}api/GatewayMobile/GetUserContentListV2`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId,
                    "ContentType": type,
                    "Search": search,
                    "CurrentPage": page,
                    "ListLength": listLength,
                    "OrganizationID": OrganizationID
                })
            }
        );

        const resData = await response.json();
        const articleList = resData.ContentList
        console.log('Found fetchArticleList response:', resData);
        dispatch({ type: SET_ARTICLE_LIST_BY_TYPE, articleList: articleList, pagination: resData.PaginationInfo, categoryType: type });
       
    };
};
export const syncArticles = (userId, OrganizationID, dateTime, isAdmin) => {
    return async dispatch => {
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        let url = `${APIUrl}api/GatewayMobile/DeltaGetUserNewsPostVideoListV2`;
        if (isAdmin) {
            url = `${APIUrl}api/GatewayMobile/DeltaGetNewsPostVideoListV2`;
        }
        const response = await fetch(
            `${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "UserId": userId,
                    "Type": 0,
                    "DateTime": dateTime,
                    "OrganizationID": OrganizationID
                })
            }
        );
        const resData = await response.json();
        const rawNewsPostVideoList = resData.NewsPostVideoList
        // if (rawNewsPostVideoList && rawNewsPostVideoList.length) {
        //     console.log('News data received count:', rawNewsPostVideoList.length);
        // }
        console.log('New articles data received count:', rawNewsPostVideoList.length);
        if (rawNewsPostVideoList && rawNewsPostVideoList.length > 0) {
            dispatch({ type: SYNC_ARTICLE_LIST, articleList: rawNewsPostVideoList });
        }
    };
};

export const fetchServerTime = () => {
    return async dispatch => {
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        let url = `${APIUrl}api/GatewayMobile/GetServerTime`;

        const response = await fetch(
            `${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                })
            }
        );
        const resData = await response.json();
        const serverTime = resData.CurrentDateTime
        
        dispatch({ type: SET_SERVER_TIME, serverTime: serverTime })
    }
}

export const updateViews = (newsPostId) => {
    return async dispatch => {
        dispatch({ type: UPDATE_ARTICLE_VIEWS, NewsPostId: newsPostId });
    }
};

export const updateLikes = (newsPostId, likeState) => {
   return async dispatch => {
        dispatch({ type: UPDATE_ARTICLE_LIKES, NewsPostId: newsPostId, likeState: likeState });
    }
};

export const updateUnLikes = (newsPostId, unlLikeState) => {
    return async dispatch => {
        dispatch({ type: UPDATE_ARTICLE_UNLIKES, NewsPostId: newsPostId, unlLikeState: unlLikeState });
    }
};

export const updatelikeDislikes = (newsPostId, IsUserLiked, IsUserUnLiked, LikeCount, UnlikeCount) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_ARTICLE_LIKE_UNLIKE,
            NewsPostId: newsPostId,
            IsUserLiked: IsUserLiked,
            IsUserUnLiked: IsUserUnLiked,
            LikeCount: LikeCount,
            UnlikeCount: UnlikeCount
        });
    }
};

export const updateRatings = (newsPostId, averageRating) => {
    return async dispatch => {
        dispatch({ type: UPDATE_ARTICLE_RATINGS, NewsPostId: newsPostId, Rating: averageRating });
    }
};

export const fetchCategoryTiles = (OrganizationID) => {
    return async dispatch => {
        const APIUrl = await AsyncStorage.getItem('EndpointURL');
        const response = await fetch(
            `${APIUrl}api/GatewayMobile/GetContentMenu`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "OrganizationID": OrganizationID
                })
            }
        );

        if (response) {
            const resData = await response.json();
            if (resData.MenuList) {
                const categoryTilesList = resData.MenuList;

                if (categoryTilesList && categoryTilesList.length > 0) {
                    const modifiedMenuSet = categoryTilesList.map(m => {
                        return {
                            menuTitle: m.DisplayText,
                            path: 'CategoryList',
                            unreadCount: 0,
                            selectedTabIcon:m.SelectedTabIcon,
                            notSelectedTabIcon:m.NotSelectedTabIcon,
                        }
                    });
                   // console.log('initial menu set:',menuItems);
                    const communicationMenuSetIndex = menuItems
                        .findIndex(m => m.menuTitle === 'Communication');
                    menuItems[communicationMenuSetIndex].subMenu = modifiedMenuSet;
                    //console.log('modified menu set:',menuItems);
                    await setSidebarMenuSet(dispatch, menuItems);
                    const categoryData = {
                        homePath: 'Homepage',
                        defaultMenuTitle: 'Communication',
                        subMenu1: menuItems[communicationMenuSetIndex].subMenu[1].menuTitle,
                        selectedTabIcon1:  menuItems[communicationMenuSetIndex].subMenu[1].selectedTabIcon,
                        notSelectedTabIcon1:  menuItems[communicationMenuSetIndex].subMenu[1].notSelectedTabIcon,
                        subMenu2: menuItems[communicationMenuSetIndex].subMenu[0].menuTitle,
                        selectedTabIcon2: menuItems[communicationMenuSetIndex].subMenu[0].selectedTabIcon,
                        notSelectedTabIcon2: menuItems[communicationMenuSetIndex].subMenu[0].notSelectedTabIcon,
                    };
                    await setStoreCategory(dispatch, categoryData);
                    dispatch({ type: SET_CATEGORY_TILES, categoryTiles: categoryTilesList });
                }





            }
        }


    };
};



export const clearArticleList = () => {
    return async dispatch => {
        console.log('starting to clear news');
        dispatch({ type: CLEAR_ARTICLE_LIST, news: null });
    };
};