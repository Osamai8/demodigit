function loadData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return undefined;
  }
}

function isActionAuth(model, key) {
  try {
    let data = localStorage.getItem("loginInfo");
    let d = JSON.parse(data);
    if (d && d.data.authentication !== undefined) {
      let el = d.data.authentication;
      if (el.length) {
        let modelFileter = el.find((e) => e.key === model);
        if (modelFileter) {
          let actions = modelFileter.actions.find((e) => e.key === key);
          if (actions) {
            return actions.access;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (err) {
    console.log("err", err);
  }
}

function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return undefined;
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem("token", data.token);
}

function deleteData(key) {
  localStorage.removeItem(key);
  localStorage.removeItem("token");
}

export { loadData, saveData, deleteData, getToken, isActionAuth };
