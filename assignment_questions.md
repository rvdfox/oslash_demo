=================================
Response for Assignment questions
=================================

1. The kind of API chosen, and why, and how it compares with other popular solutions.

> I have chosen REST API for the purpose of this assignment, given its faster implementation and since it is based on JSON, it's flexible as well. Compared to other API type like gRPC, performance wise its slow, but much faster to implement and more readable.

2. The kind of authentication mechanism chosen, and why.

> I have chose JWT (or token) based authentication for the purpose of this assignment, as in practical the user will login once
and will continue to consume the apis/service, and that will be unhindered, till the user logs out or does a password reset, further on logout, the authToken gets decomissioned, which will avoid the unintentional use of the service if someone gets access of the auth token.

3. The database chosen, and why, including performance considerations.

> I chose relational database PostgreSQL for the purpose of this assignment, because it is best suited for applications with high volume of both reads and writes, compared to other relational databases such as MySQL which is best suited for high volume reads, further it offers more complex datatype, which makes it easy to scale and store data in it.

4. Table(s) design.

> I have created 3 tables for this demo, `users`, `userAuths` and `shortcuts`. The data is distributed among these tables to keep it more modular, readable, secure and scalable, with concise indexes added in place to make read/write operation secure and optimised.

`users`

Name          |Value                                                       |
--------------+------------------------------------------------------------+
id            |1                                                           |
firstName     |ravi                                                        |
lastName      |verma                                                       |
email         |test12@abc.com                                              |
hashedPassword|$2b$10$0wi10bm7KsLwzfpFrQtSyeldXgcRfcZDVuCg941LG3ODxN3Elq4R2|
accountStatus |ACTIVE                                                      |
createdAt     |2022-12-14 02:57:29                                         |
updatedAt     |2022-12-14 02:57:29                                         |
deletedAt     |                                                            |

`userAuths`

Name        |Value              |
------------+-------------------+
id          |1                  |
userId      |1                  |
authToken   |...                |
lastActivity|2022-12-14 03:02:13|
createdAt   |2022-12-14 02:57:29|
updatedAt   |2022-12-14 03:02:13|
deletedAt   |                   |

`shortcuts`

Name       |Value                  |
-----------+-----------------------+
id         |1                      |
userId     |1                      |
shortlink  |abclink                |
fullurl    |http://hkjhajhjkjaa.com|
tags       |["a","b","c"]          |
description|abc                    |
createdAt  |2022-12-14 02:57:37    |
updatedAt  |2022-12-14 02:57:37    |
deletedAt  |                       |


