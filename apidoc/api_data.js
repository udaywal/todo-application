define({ "api": [
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendrequest/accept/:friendId",
    "title": "api to accept friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>friend id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Request accepted!\",\n    \"status\": 200,\n    \"data\": {\n        \"ok\": 1,\n        \"nModified\": 0,\n        \"n\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendrequestAcceptFriendid"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friendrequest/accept/:friendId",
    "title": "api to reject friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>friend id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Request rejected!\",\n    \"status\": 200,\n    \"data\": {\n        \"ok\": 1,\n        \"nModified\": 0,\n        \"n\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendrequestAcceptFriendid"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/all/:activeUserId",
    "title": "api to get all friends.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activeUserId",
            "description": "<p>user id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friends found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"friendId\": \"cjg_vTJAj\",\n            \"senderId\": \"P5zc6a_XT\",\n            \"senderName\": \"Vaibhav Udaywal\",\n            \"receiverId\": \"5c2NTzSxq\",\n            \"receiverName\": \"Vivek Jangid\",\n            \"isAccepted\": true,\n            \"_id\": \"5d79413f75eaa3167c1dbd16\",\n            \"createdOn\": \"2019-09-11T18:47:27.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendsAllActiveuserid"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/all",
    "title": "api to get all users.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User details found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"P5zc6a_XT\",\n            \"firstName\": \"Vaibhav\",\n            \"lastName\": \"Udaywal\",\n            \"email\": \"vaibhav@gmail.com\",\n            \"country\": \"IN\",\n            \"mobile\": 7845128956,\n            \"password\": \"$2a$10$H52SK7YLN7gohZmnlantU.WvbzBh95DhdPce1x/slrfLw8VGrZ3/u\",\n            \"createdOn\": \"2019-09-04T10:52:55.000Z\",\n            \"_id\": \"5d6f97872e6501107891543a\",\n            \"__v\": 0\n        },\n        {\n            \"userId\": \"5c2NTzSxq\",\n            \"firstName\": \"Vivek\",\n            \"lastName\": \"Jangid\",\n            \"email\": \"vk@gmail.com\",\n            \"country\": \"IN\",\n            \"mobile\": 8978546512,\n            \"password\": \"$2a$10$IsJ8lbZn9s9fAcyB6XK2Zu/MHeOagNHtjW.EuLi3zmG5b8lGHkdOm\",\n            \"createdOn\": \"2019-09-08T13:44:20.000Z\",\n            \"_id\": \"5d7505b492ce3f10ec07b495\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1UsersAll"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/friendrequest",
    "title": "api to send friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>sender id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>sender name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiver's id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverName",
            "description": "<p>receiver's name. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend request sent successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"friendId\": \"1HDDKVZC8\",\n        \"senderId\": \"P5zc6a_XT\",\n        \"senderName\": \"Vaibhav Udaywal\",\n        \"receiverId\": \"nRcLoBKi-\",\n        \"receiverName\": \"bharat sharma\",\n        \"isAccepted\": false,\n        \"createdOn\": \"2019-09-12T13:20:14.000Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "PostApiV1Friendrequest"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/view/:taskId",
    "title": "api for getting items of a task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"parentId\": \"so_pL1zQp\",\n            \"itemId\": \"TubeNGPuB\",\n            \"itemName\": \"Vaibhav Udaywal\",\n            \"itemCreatorId\": \"P5zc6a_XT\",\n            \"itemCreatorBy\": \"Vaibhav Udaywal\",\n            \"itemCreatedOn\": \"2019-09-12T12:42:57.000Z\",\n            \"_id\": \"5d7a3d51bc44c512f05732cf\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Item",
    "name": "GetApiV1ItemsViewTaskid"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/items/create",
    "title": "api for creating a new item in a task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parentId",
            "description": "<p>task id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>item name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemCreatorId",
            "description": "<p>item creator's id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemCreatorBy",
            "description": "<p>item creator's name. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Item created successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"parentId\": \"so_pL1zQp\",\n        \"itemId\": \"TubeNGPuB\",\n        \"itemName\": \"Vaibhav Udaywal\",\n        \"itemCreatorId\": \"P5zc6a_XT\",\n        \"itemCreatorBy\": \"Vaibhav Udaywal\",\n        \"itemCreatedOn\": \"2019-09-12T12:42:57.000Z\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Item",
    "name": "PostApiV1ItemsCreate"
  },
  {
    "group": "State_Management",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/history/add",
    "title": "api to add history.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>is item Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": "<p>key. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History Added\",\n    \"status\": 200,\n    \"data\": {\n        \"historyId\": \"0Ww0fBhKC\",\n        \"taskId\": \"EQkgrD1Ik\",\n        \"itemId\": \"9tmYM-Uaf\",\n        \"key\": \"Item Delete\",\n        \"itemValues\": [\n            {\n                \"_id\": \"5d7a41c5bc44c512f05732d1\",\n                \"parentId\": \"EQkgrD1Ik\",\n                \"itemId\": \"9tmYM-Uaf\",\n                \"itemName\": \"Gymming\",\n                \"itemCreatorId\": \"P5zc6a_XT\",\n                \"itemCreatorBy\": \"Vaibhav Udaywal\",\n                \"itemCreatedOn\": \"2019-09-12T13:01:57.000Z\",\n                \"__v\": 0\n            }\n        ],\n        \"createdOn\": \"2019-09-12T13:05:18.000Z\",\n        \"_id\": \"5d7a428ebc44c512f05732d2\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "State_Management",
    "name": "PostApiV1HistoryAdd"
  },
  {
    "group": "State_Management",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/history/delete",
    "title": "api to delete history.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History deleted!\",\n    \"status\": 200,\n    \"data\": {\n        \"ok\": 1,\n        \"n\": 1,\n        \"deletedCount\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "State_Management",
    "name": "PostApiV1HistoryDelete"
  },
  {
    "group": "State_Management",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/history/get",
    "title": "api to get history.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History - History Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5d7a428ebc44c512f05732d2\",\n            \"historyId\": \"0Ww0fBhKC\",\n            \"taskId\": \"EQkgrD1Ik\",\n            \"itemId\": \"9tmYM-Uaf\",\n            \"key\": \"Item Delete\",\n            \"itemValues\": [\n                {\n                    \"_id\": \"5d7a41c5bc44c512f05732d1\",\n                    \"parentId\": \"EQkgrD1Ik\",\n                    \"itemId\": \"9tmYM-Uaf\",\n                    \"itemName\": \"Gymming\",\n                    \"itemCreatorId\": \"P5zc6a_XT\",\n                    \"itemCreatorBy\": \"Vaibhav Udaywal\",\n                    \"itemCreatedOn\": \"2019-09-12T13:01:57.000Z\",\n                    \"__v\": 0\n                }\n            ],\n            \"createdOn\": \"2019-09-12T13:05:18.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "State_Management",
    "name": "PostApiV1HistoryGet"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/delete/:itemId",
    "title": "api to delete a item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>item id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Item deleted!\",\n    \"status\": 200,\n    \"data\": {\n        \"parentId\": \"so_pL1zQp\",\n        \"itemId\": \"TubeNGPuB\",\n        \"itemName\": \"Vaibhav Udaywal\",\n        \"itemCreatorId\": \"P5zc6a_XT\",\n        \"itemCreatorBy\": \"Vaibhav Udaywal\",\n        \"itemCreatedOn\": \"2019-09-12T12:42:57.000Z\",\n        \"_id\": \"5d7a3d51bc44c512f05732cf\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "GetApiV1ItemsDeleteItemid"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/tasks/all/private/:activeUserId",
    "title": "api for getting private tasks.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activeUserId",
            "description": "<p>user id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Private Tasks found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"taskId\": \"so_pL1zQp\",\n            \"taskName\": \"Study\",\n            \"isPrivate\": true,\n            \"creatorId\": \"P5zc6a_XT\",\n            \"createdBy\": \"Vaibhav Udaywal\",\n            \"_id\": \"5d7a387ccb0b6813e4b55712\",\n            \"createdOn\": \"2019-09-12T12:22:20.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "GetApiV1TasksAllPrivateActiveuserid"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/tasks/all/public/:activeUserId",
    "title": "api for getting public tasks.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activeUserId",
            "description": "<p>user id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Public Tasks found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"taskId\": \"Io_pG6zQp\",\n            \"taskName\": \"Gym\",\n            \"isPrivate\": false,\n            \"creatorId\": \"P5zc6a_XT\",\n            \"createdBy\": \"Vaibhav Udaywal\",\n            \"_id\": \"5d7a387ccb0b6813e4b55712\",\n            \"createdOn\": \"2019-09-8T12:22:20.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "GetApiV1TasksAllPublicActiveuserid"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/tasks/all/public/:activeUserId",
    "title": "api for getting public tasks.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Task found!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"taskId\": \"so_pL1zQp\",\n            \"taskName\": \"Study\",\n            \"isPrivate\": true,\n            \"creatorId\": \"P5zc6a_XT\",\n            \"createdBy\": \"Vaibhav Udaywal\",\n            \"_id\": \"5d7a387ccb0b6813e4b55712\",\n            \"createdOn\": \"2019-09-12T12:22:20.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "GetApiV1TasksAllPublicActiveuserid"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/tasks/delete/:taskId",
    "title": "api to delete a task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskId",
            "description": "<p>task id. (url params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Task deleted succesfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"taskId\": \"so_pL1zQp\",\n        \"taskName\": \"Study\",\n        \"isPrivate\": true,\n        \"creatorId\": \"P5zc6a_XT\",\n        \"createdBy\": \"Vaibhav Udaywal\",\n        \"_id\": \"5d7a387ccb0b6813e4b55712\",\n        \"createdOn\": \"2019-09-12T12:22:20.000Z\",\n        \"undoCounts\": 0,\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "GetApiV1TasksDeleteTaskid"
  },
  {
    "group": "Task",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/tasks/create",
    "title": "api for creating a new task.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "taskName",
            "description": "<p>task name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>is task private?. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>task creator's name. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>admin's email. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Task created successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"taskId\": \"so_pL1zQp\",\n        \"taskName\": \"Study\",\n        \"isPrivate\": true,\n        \"creatorId\": \"P5zc6a_XT\",\n        \"createdBy\": \"Vaibhav Udaywal\",\n        \"createdOn\": \"2019-09-12T12:22:20.000Z\",\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/task.js",
    "groupTitle": "Task",
    "name": "PostApiV1TasksCreate"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/forgotpassword",
    "title": "api to get password link in email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>user email. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password reset link sent Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1Forgotpassword"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/login",
    "title": "api for sign in.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Welcome Back! Login succesful!\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw\",\n        \"userDetails\": {\n            \"userId\": \"KFJ8suFYL\",\n            \"firstName\": \"Emma\",\n            \"lastName\": \"Watson\",\n            \"email\": \"emmawatson@gmail.com\",\n            \"country\": \"England\",\n            \"mobile\": 7240277241,\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1Login"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/logout",
    "title": "api to sign out active user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activeUserId",
            "description": "<p>loggedin userId of the the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"logout successful!\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"tokenGenerationTime\": \"2019-08-18T19:16:03.000Z\",\n            \"_id\": \"5d59a3f3d182a603d8ed02fd\",\n            \"userId\": \"KFJ8suFYL\",\n            \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw\",\n            \"tokenSecret\": \"someVeryRandomStringThatNobodyCanGuessLiterallyNobodyCanGuess\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1Logout"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/resetPassword",
    "title": "api to set new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user's Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password changed Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1Resetpassword"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/signup",
    "title": "api for sign up.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country Name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error, message, status, data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Congrats! user created succesfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"KFJ8suFYL\",\n        \"firstName\": \"Emma\",\n        \"lastName\": \"Watson\",\n        \"email\": \"emmawatson@gmail.com\",\n        \"country\": \"England\",\n        \"mobile\": 7240277241,\n        \"createdOn\": \"2019-08-18T19:04:58.000Z\",\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1Signup"
  }
] });
