export async function savePost(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
}

export async function getAllPost() {
  const response = await fetch(`${process.env.REACT_APP_API}/post/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function getAdminPost() {
  const response = await fetch(`${process.env.REACT_APP_API}/post/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function getUserPost(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/post/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data;
}

export async function getPostDetails(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/post/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data;
}

export async function getUserDetails(values) {
  const response = await fetch(`${process.env.REACT_APP_API}/post/userDetail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  return data;
}

export async function updateStatus(values) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/post/updateStatus`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const data = await response.json();

  return data;
}
