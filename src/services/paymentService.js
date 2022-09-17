export async function createPaymentOrder(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/create-payment-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

export async function PayForOrder(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/pay-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

export async function savePaymentInfo(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/savePaymentInfo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

export async function linkPostPayment(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/linkPostPayment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}
export async function getPaymentInfo(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/paymentInfo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}

export async function getTotalPayment(values, token) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/payment/totalPayment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();
  return data;
}
