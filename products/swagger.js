const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Users CRUD API",
        "description": "Products and Users application",
        "contact": {
            "name": "Michalis Koutrakis",
            "url": "https://www.example.com",
            "email": "support@example.com"
        }
    },
    "components": { // Models
        "schemas": {
            "User": m2s(User),
            "Product": m2s(Product)
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "http://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "Requests for user"
        },
        {
            "name": "Users and Products",
            "description": "Requests for Users and Products"
        },
        {
            "name": "Products",
            "description": "Requests for products."
        }
    ],
    "paths": {
        "/api/users": {
            "get": { // GET method belongs to some tags
                "tags": ["Users"],
                "description": "Returns all users.",
                "responses": {
                    "200": {
                        "description": "List of all users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array", // returns an array
                                    "items": {
                                        // # is used in order to go to components located in this file
                                        "$ref": "#/components/schemas/User" // Items are of type User.
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Users"],
                "description": "Creates new user",
                "requestBody": {    // Morfh tou request
                    "description": "Data for user that we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "password": {"type": "string"},
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "email":{"type": "string"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "string"},
                                                "number": {"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "name", "surname"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    }
                }
            }
        },
        "/api/users/{username}": {
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get user with specific username",
                "responses": {
                    "200": {
                        "description": "User result",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Users"],
                "description": "Update user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "User to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "email": {"type": "string"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update user",
                        "schema": {
                            "$ref": "#/components/schema/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Users"],
                "description": "Deletes user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a user"
                    }
                }
            }
        },
        "/api/user-product/users/products": {
            "get": {
                "tags": ["Users and Products"],
                "description": "Returns all users with their products",
                "responses": {
                    "200": {
                        "description": "All users with their products"
                    }
                }
            }
        },
        "/api/user-product/{username}/products": {
            "get": {
                "tags": ["Users and Products"],
                "parameters": [{
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "description": "Username of user to find products",
                    "type": "string"
                }],
                "description": "Products for a username",
                "responses": {
                    "200": {
                        "description": "Products of username"
                    }
                }
            },
            "post": {
                "tags": ["Users and Products"],
                "parameters": [{
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "description": "Username of user to find products",
                    "type": "string"
                }],
                "description": "Add new products to user",
                "requestBody": {
                    "description": "Data to add products",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "products": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": {"type": "string"},
                                                "cost": {"type": "number"},
                                                "quantity": {"type": "number"}
                                            }
                                        }
                                    }
                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New products added to user"
                    }
                }
            }
        },
        "/api/users-products/{username}/products/{id}": {
            "patch": {
                "tags": ["Users and Products"],
                "description": "Update user's product.",
                "parameters": [{
                    "name": "username",
                    "in": "path",
                    "require": true,
                    "description": "User's username.",
                    "type": "string"
                }, {
                    "name": "id",
                    "in": "path",
                    "require": true,
                    "description": "Product's id.",
                    "type": "string"
                }],
                "requestBody": {
                    "description": "Quantity of product to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "quantity": {"type": "number"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
                "response": {
                    "200": {
                        "description": "Product of user updated."
                    }
                }
            }
        },
        "/api/products": {
            "get": {
                "tags": ["Products"],
                "description": "Returns all products.",
                "responses": {
                    "200": {
                        "description": "List of all products.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Products"],
                "description": "Insert new product",
                "requestBody": {
                    "description": "Data for product we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {"type": "string"},
                                    "cost": {"type": "numeric"},
                                    "description": {"type": "string"},
                                    "quantity": {"type": "numeric"}
                                },
                                "required": ["product", "cost", "quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New product is created",
                        "schema": {
                            "$ref": "#/components/schema/Product"
                        }
                    }
                }
            }
        },
        "/api/products/{id}": {
            "get": {
                "tags": ["Products"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "The product id in the database.",
                        "type": "string"
                    }
                ],
                "description": "Get product with specific id.",
                "responses": {
                    "200": {
                        "description": "Product result",
                        "schema": {
                            "$ref": "#/components/schemas/Product"
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Products"],
                "description": "Update product",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "The product id in the database.",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Product to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {"type": "string"},
                                    "cost": {"type": "numeric"},
                                    "description": {"type": "string"},
                                    "quantity": {"type": "numeric"}
                                },
                                "required": ["product", "cost", "quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update Product",
                        "schema": {
                            "$ref": "#/components/schema/Product"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Products"],
                "description": "Deletes product",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "The product id in the database.",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product deleted."
                    }
                }
            }
        }
    }
}