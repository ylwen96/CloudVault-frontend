// src/api.js

// Files microservice API, defaults to localhost:8080
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Given an authenticated user, request all Files for this user from the
 * Files microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
// GET Files
export async function getUserFiles(user) {
  console.log('Requesting user Files data...');
  try {
    const res = await fetch(`${apiUrl}/drive/files`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    // console.log('Got user Files data', { data });
    return data
  } catch (err) {
    console.error('Unable to call GET /drive/files', { err });
  }
}

// GET expanded Files
export async function getUserFilesExpanded(user) {
  try {
    const res = await fetch(`${apiUrl}/drive/files?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    // console.log('Got user Files expanded data', { data });
    return data
  } catch (err) {
    console.error('Unable to call GET /drive/files', { err });
  }
}

// GET File
export async function getFileById(user, id) {
  try {
    const res = await fetch(`${apiUrl}/drive/files/${id}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const type = res.headers.get('content-type')
    let data
    if (type === 'image/jpeg' || type === 'image/gif' || type === 'image/webp' || type === 'image/png') {
      data = res.blob()

    } else {
      data = res.text()
    }
    return data
  } catch (err) {
    console.error('Unable to call GET /drive/files', { err });
    return null
  }
}

// GET File with Info
export async function getFileInfoById(user, id) {
  try {
    const res = await fetch(`${apiUrl}/drive/files/${id}/info`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    // console.log('Got user Files expanded data', { data });
    return data
  } catch (err) {
    console.error('Unable to call GET /drive/files', { err });
    return null
  }
}

// POST File
export async function postUserFiles(user, type, content) {
  console.log("User just post a '", type, "' File");
  try {
    const res = await fetch(`${apiUrl}/drive/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": type,
      },
      body: content
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Post user Files data', { data });
  } catch (err) {
    console.error('Unable to call POST /drive/files', { err });
  }
}

// PUT File
export async function putUserFiles(user, id, type, content) {
  console.log("User just put a '", id, "' File");
  try {
    const res = await fetch(`${apiUrl}/drive/files/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": type,
      },
      body: content
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('Unable to call PUT /drive/files', { err });
  }
}

// DELETE File
export async function deleteUserFiles(user, id) {
  console.log("User just delete a '", id, "' File");
  try {
    const res = await fetch(`${apiUrl}/drive/files/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      }
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('Unable to call DELETE /drive/files', { err });
  }
}

// CONVERT File
export async function convertUserFiles(user, id, type) {
  console.log("User just convert a '", id, "' File into ", type);
  try {
    var type_ext = "";
    switch (type) {
      case "text/plain":
        type_ext = ".txt";
        break;
      case "text/markdown":
        type_ext = ".md";
        break;
      case "text/html":
        type_ext = ".html";
        break;
      case "application/json":
        type_ext = ".json";
        break;
      case "image/png":
        type_ext = ".png";
        break;
      case "image/jpeg":
        type_ext = ".jpeg";
        break;
      case "image/webp":
        type_ext = ".webp";
        break;
      case "image/gif":
        type_ext = ".gif";
        break;
      default:
        break;
    }
    const res = await fetch(`${apiUrl}/drive/files?${id}${type_ext}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('Unable to call GET to convert /drive/files', { err });
  }
}