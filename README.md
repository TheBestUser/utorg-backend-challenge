# UTORG test challenge

## Usage

Application provides a simple HTTP interface for fetching tokens rate available on URL `localhost:3000/rate`

### Docker
```shell
docker-compose up -d
```

### Local

```shell
yarn && yarn start
```

## Description
Create NodeJS application using Nest.js framework to fetch crypto currency rates from Pancakeswap on BSC.

No need to find routes via 2 or more pools. If no direct pool is available - just throw an error.
Default numbers precision is 6. Round down toAmount (e.g. 0.9 -> 0), round up fromAmount (e.g. 0.1 -> 1) in result and round down both fields in request preprocessing.

Example requests to api method `/rate` (use POST):
```json
{
  "from": "0x55d398326f99059ff775485246999027b3197955",
  "to": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "fromAmount": "1000.000000" // How much we wanna spend
}
```

```json
{
  "from": "0x55d398326f99059ff775485246999027b3197955",
  "to": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "toAmount": "10.000000" // How much we wanna get
}
```

One of fromAmount, toAmount should exists. Add more field validations on your own.

Example OK response:
```json
{
  "success": true,
  "data": {
    "fromAmount": "1000.000000",
    "toAmount": "10.000000"
  }
}
```



Example ERROR response:
```json
{
  "success": false,
  "error": "Direct pair not found"
}
```

