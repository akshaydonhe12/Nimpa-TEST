var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "j59y6842fzsvfdc9",
  publicKey: "d2w9jvryzxybh4dw",
  privateKey: "23065b85b140f32a36cde274d473d0b9"
});



exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, 
        function (err, response) {
            if(err) {
                res.status(500).send(err);
            }else{
                res.send(response);
            }
   });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(error)
         }else{
            res.json(result)
         }
      }
    ); 
};