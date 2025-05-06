Bitpanda Public API Documentation
=================================

**ATTENTION:** Starting on January 2, 2024, all listed endpoints will no longer support page-based pagination. To ensure uninterrupted service for your applications, please transition to cursor-based pagination before the specified deadline.

**version:** v1  
**baseUri:** https://api.bitpanda.com/v1  
**protocols:** HTTPS  
**mediaType:** application/json

Cursor Pagination
-----------------

Endpoints that require paginated results use cursor-based pagination. Clients can make use of the `cursor` and `page_size` query parameters to navigate through paginated data.

The `cursor` parameter refers to the identifier (e.g., id) of an item within the resource. The API will return items that come after the specified cursor. If no cursor is provided or if it is empty, the pagination starts from the first record.

The `page_size` parameter specifies the number of items to be returned in the response. If the `page_size` is omitted, the API uses a default page size specific to the endpoint.

Trades
======

A trade is an exchange of one asset against another asset.

* * *

List trades
-----------

`GET /trades` _(secured)_

Lists all user's trades. Newest trades come first. Response is cursor paginated.

  

**_**Query Parameters**_**

**type**  

One of `buy` or `sell`

Property

Value

_required_

false

_type_

string

**cursor**  

Id of the last known trade by the client. Only trades after this id are returned. Empty or missing cursor parameter will return trades from the start.

Property

Value

_required_

false

_type_

string

**page\_size**  

Size of a page for the paginated response

Property

Value

_required_

false

_type_

integer

  

**_**Possible Responses**_**

**200**

Successfull operation

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List trades
-----------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/trades" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
      "data": [
        {
            "type": "trade",
            "attributes": {
                "status": "finished",
                "type": "buy",
                "cryptocoin_id": "1",
                "fiat_id": "1",
                "amount_fiat": "100.00",
                "amount_cryptocoin": "0.03325352",
                "fiat_to_eur_rate": "1.00000000",
                "wallet_id": "b8448e50-21e4-11e8-923c-83856b384ff7",
                "fiat_wallet_id": "4019cdb0-1d62-11e8-b4b2-313f9b0a3bca",
                "payment_option_id": "12",
                "time": {
                    "date_iso8601": "2019-02-05T11:41:04+01:00",
                    "unix": "1549363264"
                },
                "price": "3007.20",
                "is_swap": false
            },
            "id": "88ea98a0-2932-11e9-91da-8bbc17ef282b"
        },
        {
            "type": "trade",
            "attributes": {
                "status": "finished",
                "type": "buy",
                "cryptocoin_id": "1",
                "fiat_id": "1",
                "amount_fiat": "50.00",
                "amount_cryptocoin": "0.01662676",
                "fiat_to_eur_rate": "1.00000000",
                "wallet_id": "b8448e50-21e4-11e8-923c-83856b384ff7",
                "fiat_wallet_id": "4019cdb0-1d62-11e8-b4b2-313f9b0a3bca",
                "payment_option_id": "12",
                "time": {
                    "date_iso8601": "2019-02-05T11:40:21+01:00",
                    "unix": "1549363221"
                },
                "price": "3007.20",
                "is_swap": false
            },
            "id": "6f6ba3a0-2932-11e9-bdcb-efc7d8bd663c"
        }
      ],
      "meta": {
          "total_count": 114,
          "next_cursor": "6f6ba3a0-2932-11e9-bdcb-efc7d8bd663c",
          "page_size": 2
      },
      "links": {
          "next": "?cursor=6f6ba3a0-2932-11e9-bdcb-efc7d8bd663c&page_size=2",
          "self": "?cursor=&page_size=2"
      }
    }
    

Type

    any

Asset wallets
=============

A wallet is an user's balance for an asset.

* * *

List asset wallets
------------------

`GET /asset-wallets` _(secured)_

List all user's asset wallets grouped by asset type.

  

**_**Possible Responses**_**

**200**

All user's asset wallets grouped by asset type.

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List asset wallets
------------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/asset-wallets" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": {
            "type": "data",
            "attributes": {
                "cryptocoin": {
                    "type": "collection",
                    "attributes": {
                        "wallets": [
    
                            {
                                "type": "wallet",
                                "attributes": {
                                    "cryptocoin_id": "33",
                                    "cryptocoin_symbol": "BEST",
                                    "balance": "11111.11111111",
                                    "is_default": true,
                                    "name": "BEST Wallet",
                                    "deleted": false
                                },
                                "id": "a006f694-c075-49a9-9c08-b0fb07da9ef4"
                            },
                            {
                                "type": "wallet",
                                "attributes": {
                                    "cryptocoin_id": "34",
                                    "cryptocoin_symbol": "BAT",
                                    "balance": "0.00000000",
                                    "is_default": true,
                                    "name": "BAT Wallet",
                                    "deleted": false
                                },
                                "id": "3f6f7f02-7e93-4628-bce5-0c3147b6eaa1"
                            }
                        ]
                    }
                },
                "commodity": {
                    "metal": {
                        "type": "collection",
                        "attributes": {
                            "wallets": [
                                {
                                    "type": "wallet",
                                    "attributes": {
                                        "cryptocoin_id": "28",
                                        "cryptocoin_symbol": "XAU",
                                        "balance": "0.00000000",
                                        "is_default": true,
                                        "name": "Gold Wallet",
                                        "deleted": false
                                    },
                                    "id": "6aa5a9bd-8bba-4f77-8a98-500ef4769256"
                                },
                                {
                                    "type": "wallet",
                                    "attributes": {
                                        "cryptocoin_id": "29",
                                        "cryptocoin_symbol": "XAG",
                                        "balance": "0.00000000",
                                        "is_default": true,
                                        "name": "Silver Wallet",
                                        "deleted": false
                                    },
                                    "id": "518d2ad8-eb0f-4240-a3aa-6eabbb4b6723"
                                }
                            ]
                        }
                    }
                }
            }
        },
        "last_user_action": {
            "date_iso8601": "2019-07-12T13:32:20+02:00",
            "unix": "1562931140"
        }
    }
    

Type

    any

Fiat wallets
============

A wallet is an user's balance for an asset.

* * *

List fiat wallets
-----------------

`GET /fiatwallets` _(secured)_

List all user's fiat wallets.

  

**_**Possible Responses**_**

**200**

All user's fiat wallets.

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List fiat wallets
-----------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/fiatwallets" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": [
            {
                "type": "fiat_wallet",
                "attributes": {
                    "fiat_id": "1",
                    "fiat_symbol": "EUR",
                    "balance": "9909.00000000",
                    "name": "EUR Wallet",
                    "pending_transactions_count": 0
                },
                "id": "4019cdb0-1d62-11e8-b4b2-313f9b0a3bca"
            },
            {
                "type": "fiat_wallet",
                "attributes": {
                    "fiat_id": "2",
                    "fiat_symbol": "USD",
                    "balance": "125.41000000",
                    "name": "USD Wallet",
                    "pending_transactions_count": 0
                },
                "id": "40250290-1d62-11e8-a152-939807bda3e6"
            },
            {
                "type": "fiat_wallet",
                "attributes": {
                    "fiat_id": "3",
                    "fiat_symbol": "CHF",
                    "balance": "0.00000000",
                    "name": "CHF Wallet",
                    "pending_transactions_count": 0
                },
                "id": "402c9ee0-1d62-11e8-96e0-a1d75c233305"
            },
            {
                "type": "fiat_wallet",
                "attributes": {
                    "fiat_id": "4",
                    "fiat_symbol": "GBP",
                    "balance": "0.00000000",
                    "name": "GBP Wallet",
                    "pending_transactions_count": 0
                },
                "id": "40438bf0-1d62-11e8-935b-1f1b9d316aa0"
            }
        ]
    }
    

Type

    any

* * *

List fiat transactions
----------------------

`GET /fiatwallets/transactions` _(secured)_

List all user's fiat transactions. Newest fiat transactions come first. Response is cursor paginated.

  

**_**Query Parameters**_**

**type**  

buy, sell, deposit, withdrawal, transfer, refund

Property

Value

_required_

false

_type_

string

**status**  

pending, processing, finished, canceled

Property

Value

_required_

false

_type_

string

**cursor**  

Id of the last known fiat transaction by the client. Only fiat transactions after this id are returned. Empty or missing cursor parameter will return fiat transactions from the start.

Property

Value

_required_

false

_type_

string

**page\_size**  

Size of a page for the paginated response

Property

Value

_required_

false

_type_

integer

  

**_**Possible Responses**_**

**200**

All user's fiat transactions.

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List fiat transactions
----------------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/fiatwallets/transactions" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": [
            {
                "type": "fiat_wallet_transaction",
                "attributes": {
                    "fiat_wallet_id": "4019cdb0-1d62-11e8-b4b2-313f9b0a3bca",
                    "user_id": "331efc50-1d62-11e8-89e6-c9db2cf7f1cc",
                    "fiat_id": "1",
                    "amount": "10.00000000",
                    "fee": "0.00000000",
                    "to_eur_rate": "1.00000000",
                    "time": {
                        "date_iso8601": "2019-02-21T17:53:23+01:00",
                        "unix": "1550768003"
                    },
                    "in_or_out": "outgoing",
                    "type": "transfer",
                    "status": "finished",
                    "confirmation_by": "not_required",
                    "confirmed": false,
                    "payment_option_id": "12",
                    "requires_2fa_approval": false,
                    "last_changed": {
                        "date_iso8601": "2019-02-21T17:53:23+01:00",
                        "unix": "1550768003"
                    }
                },
                "id": "330bf710-35f9-11e9-9ad6-835877ccb6b9"
            },
            {
                "type": "fiat_wallet_transaction",
                "attributes": {
                    "fiat_wallet_id": "2a02d5e0-9fad-11e8-b262-8fdb9d6a563e",
                    "user_id": "331efc50-1d62-11e8-89e6-c9db2cf7f1cc",
                    "fiat_id": "1",
                    "amount": "10.00000000",
                    "fee": "0.00000000",
                    "to_eur_rate": "1.00000000",
                    "time": {
                        "date_iso8601": "2019-02-21T17:53:23+01:00",
                        "unix": "1550768003"
                    },
                    "in_or_out": "incoming",
                    "type": "transfer",
                    "status": "finished",
                    "confirmation_by": "not_required",
                    "confirmed": false,
                    "payment_option_id": "12",
                    "requires_2fa_approval": false,
                    "last_changed": {
                        "date_iso8601": "2019-02-21T17:53:23+01:00",
                        "unix": "1550768003"
                    }
                },
                "id": "33190c50-35f9-11e9-8642-a5468ff4ff64"
            }
        ],
        "meta": {
              "total_count": 114,
              "next_cursor": "33190c50-35f9-11e9-8642-a5468ff4ff64",
              "page_size": 2
        },
        "links": {
              "next": "?next_cursor=33190c50-35f9-11e9-8642-a5468ff4ff64&page_size=2",
              "self": "?cursor=&page_size=2"
        }
    }
    

Type

    any

Crypto wallets
==============

A wallet is an user's balance for an asset.

* * *

List crypto wallets
-------------------

`GET /wallets` _(secured)_

Lists all user's crypto wallets.

  

**_**Possible Responses**_**

**200**

All user crypto wallets

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List crypto wallets
-------------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/wallets" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": [
            {
                "type": "wallet",
                "attributes": {
                    "cryptocoin_id": "1",
                    "cryptocoin_symbol": "BTC",
                    "balance": "1.00000000",
                    "is_default": true,
                    "name": "BTC wallet",
                    "pending_transactions_count": 0,
                    "deleted": false
                },
                "id": "3d6f9780-1d62-11e8-b0cd-415b226545f3"
            },
            {
                "type": "wallet",
                "attributes": {
                    "cryptocoin_id": "1",
                    "cryptocoin_symbol": "ETH",
                    "balance": "2.00000000",
                    "is_default": true,
                    "name": "ETH wallet",
                    "pending_transactions_count": 0,
                    "deleted": false
                },
                "id": "a0e6a9d0-214d-11e8-888b-3bd3418b24c9"
            }
        ]
    }
    

Type

    any

* * *

List crypto transactions
------------------------

`GET /wallets/transactions` _(secured)_

Lists all user's crypto transactions. Newest crypto transactions come first. Response is cursor paginated.

  

**_**Query Parameters**_**

**type**  

One of `buy`, `sell`, `deposit`, `withdrawal`, `transfer`, `refund` or `ico`.

Property

Value

_required_

false

_type_

string

**status**  

One of `pending`, `processing`, `unconfirmed_transaction_out`, `open_invitation`, `finished` or `canceled`.

Property

Value

_required_

false

_type_

string

**cursor**  

Id of the last known crypto transaction by the client. Only crypto transactions after this id are returned. Empty or missing cursor parameter will return crypto transactions from the start.

Property

Value

_required_

false

_type_

string

**page\_size**  

Size of a page for the paginated response

Property

Value

_required_

false

_type_

integer

  

**_**Possible Responses**_**

**200**

All user's crypto transactions.

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List crypto transactions
------------------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/wallets/transactions?cursor=f12e4a04-278d-4ce8-a554-920782a4fe5b&page_size=2" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": [
            {
                "type": "transaction",
                "attributes": {
                    "amount": "10.00000000",
                    "recipient": "",
                    "time": {
                        "date_iso8601": "2019-02-21T16:36:01+01:00",
                        "unix": "1550763361"
                    },
                    "confirmations": 99,
                    "in_or_out": "outgoing",
                    "type": "transfer",
                    "status": "finished",
                    "amount_eur": "34333.00",
                    "purpose_text": "",
                    "related_wallet_transaction_id": "6492ece0-35ee-11e9-9529-3d43ab8964c7",
                    "related_wallet_id": "87e69890-c87d-11e8-b039-a7fc9124f788",
                    "wallet_id": "b8448e50-21e4-11e8-923c-83856b384ff7",
                    "confirmed": true,
                    "cryptocoin_id": "1",
                    "last_changed": {
                        "date_iso8601": "2019-02-21T16:36:01+01:00",
                        "unix": "1550763361"
                    },
                    "fee": "0.00000000",
                    "current_fiat_id": "2",
                    "current_fiat_amount": "39021.02",
                    "tx_id": "internal"
                },
                "id": "648de980-35ee-11e9-a458-8b689f4be784"
            },
            {
                "type": "transaction",
                "attributes": {
                    "amount": "10.00000000",
                    "recipient": "",
                    "time": {
                        "date_iso8601": "2019-02-21T16:36:01+01:00",
                        "unix": "1550763361"
                    },
                    "confirmations": 99,
                    "in_or_out": "incoming",
                    "type": "transfer",
                    "status": "finished",
                    "amount_eur": "34333.00",
                    "purpose_text": "",
                    "related_wallet_transaction_id": "648de980-35ee-11e9-a458-8b689f4be784",
                    "related_wallet_id": "b8448e50-21e4-11e8-923c-83856b384ff7",
                    "wallet_id": "87e69890-c87d-11e8-b039-a7fc9124f788",
                    "confirmed": true,
                    "cryptocoin_id": "1",
                    "last_changed": {
                        "date_iso8601": "2019-02-21T16:36:01+01:00",
                        "unix": "1550763361"
                    },
                    "fee": "0.00000000",
                    "current_fiat_id": "2",
                    "current_fiat_amount": "39021.02",
                    "tx_id": "internal"
                },
                "id": "6492ece0-35ee-11e9-9529-3d43ab8964c7"
            }
        ],
        "meta": {
              "total_count": 114,
              "cursor": "f12e4a04-278d-4ce8-a554-920782a4fe5b",
              "next_cursor": "6492ece0-35ee-11e9-9529-3d43ab8964c7",
              "page_size": 2
        },
        "links": {
            "next": "?cursor=6492ece0-35ee-11e9-9529-3d43ab8964c7&page_size=2",
            "self": "?cursor=f12e4a04-278d-4ce8-a554-920782a4fe5b&page_size=2"
        }
    }
    

Type

    any

Commodity wallets
=================

A wallet is an user's balance for an asset.

* * *

List commodity transactions.
----------------------------

`GET /assets/transactions/commodity` _(secured)_

List all user's commodity transactions. Newest commodity transactions come first. Response is cursor paginated.

  

**_**Query Parameters**_**

**cursor**  

Id of the last known commodity transaction by the client. Only commodity transactions after this id are returned. Empty or missing cursor parameter will return commodity transactions from the start.

Property

Value

_required_

false

_type_

string

**page\_size**  

Size of a page for the paginated response

Property

Value

_required_

false

_type_

integer

  

**_**Possible Responses**_**

**200**

Get user's commodity transactions

**401**

Credentials / Access token wrong

**500**

Internal server error

* * *

List commodity transactions
---------------------------

> ### CURL EXAMPLE

    curl -X GET "https://api.bitpanda.com/v1/assets/transactions/commodity" \
    	-H "X-Api-Key: string"

> ### RESPONSE BODY

#### _200_

    {
        "data": [
            {
                "type": "transaction",
                "attributes": {
                    "amount": "24.76360099",
                    "recipient": "",
                    "time": {
                        "date_iso8601": "2019-07-12T14:26:19+02:00",
                        "unix": "1562934379"
                    },
                    "in_or_out": "incoming",
                    "type": "buy",
                    "status": "finished",
                    "amount_eur": "1000.00",
                    "wallet_id": "6aa5a9bd-8bba-4f77-8a98-500ef4769256",
                    "confirmed": true,
                    "cryptocoin_id": "28",
                    "trade": {
                        "type": "trade",
                        "attributes": {
                            "status": "finished",
                            "type": "buy",
                            "cryptocoin_id": "28",
                            "fiat_id": "1",
                            "amount_fiat": "1000.00",
                            "amount_cryptocoin": "24.76360099",
                            "fiat_to_eur_rate": "1.00000000",
                            "wallet_id": "6aa5a9bd-8bba-4f77-8a98-500ef4769256",
                            "fiat_wallet_id": "88db1d66-5f45-4df0-888b-c932584617a7",
                            "payment_option_id": "12",
                            "time": {
                                "date_iso8601": "2019-07-12T14:26:19+02:00",
                                "unix": "1562934379"
                            },
                            "price": "40.38",
                            "is_swap": false,
                            "is_savings": false
                        },
                        "id": "78cf35e9-c5c2-4b0b-8b2c-5ba67c165867"
                    },
                    "last_changed": {
                        "date_iso8601": "2019-07-12T14:26:19+02:00",
                        "unix": "1562934379"
                    },
                    "fee": "0.00000000",
                    "current_fiat_id": "1",
                    "current_fiat_amount": "1000.00",
                    "tx_id": "internal",
                    "is_savings": false,
                    "is_metal_storage_fee": false,
                    "tags": []
                },
                "id": "01c80443-eee9-437a-8d65-d9a1c07312d6"
            }
        ],
        "meta": {
            "total_count": 1,
            "next_cursor": "01c80443-eee9-437a-8d65-d9a1c07312d6",
            "page_size": 25
        },
        "links": {
            "self": "?cursor=&page_size=25"
        }
    }
    

Type

    any