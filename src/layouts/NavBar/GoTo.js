import RemoveIcon from "@material-ui/icons/Remove";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoTo = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subNav, setSubnav] = useState(false);
  const [subSubNav, setSubSubNav] = useState({
    index: "",
    status: false
  });
  const [match, setMatch] = useState(false);

  const isMaster =
    item.subNav?.to === "/app/state/list" ||
    item.subNav?.to === "/app/district/list" ||
    item.subNav?.to === "/app/block/list" ||
    item.subNav?.to === "/app/domain/list" ||
    item.subNav?.to === "/app/sub_domain/list" ||
    item.subNav?.to === "/app/stream/list";

  const handleClick = (obj) => {
    console.log(obj);
    if (obj.to === "dashboard") {
      console.log("msdnfbsmdfs")
      let link = document.createElement('a');
      link.setAttribute('href', `https://stgsuperset.dhwaniris.in/superset/dashboard/14/?native_filters_key=C5bDNW7ttVapZp-_7MWLTLvYrP1XrPbAxjWbvRxbFPO7ugCrxekNdYEMOlOq889u`);
      link.setAttribute('target', '_blank');
      link.click();
      return;
    } else {
      navigate(obj.to, { replace: true });
    }
  };

  const handleSubNavClick = (obj) => {
    if (obj.subNav) {
      setSubSubNav({
        ...subSubNav,
        status: obj.id == subSubNav.index ? !subSubNav.status : true,
        index: obj.id
      });
    } else {
      navigate(obj.to, { replace: true });
    }
  };

  useEffect(() => {
    // setMatch(location.pathname === item.to);
    const titleFromPath = location.pathname.trim().split("/")[2];
    const titleFromPrps = item.title
      .split(" ")
      .join("_")
      .toLowerCase();

    // setMatch(
    //   location.pathname.indexOf(item.title.split(" ")[0].toLowerCase()) > -1
    // );
    setMatch(titleFromPath === titleFromPrps);
  }, [location.pathname, item.title]);

  const isActiveLink = (navLink) => {
    let k = location.pathname.includes(navLink.to);
    return k;
  };

  return (
    <>
      <li
        className={`navItems ${(match || isMaster) && "active"} `}
        onClick={() => handleClick(item)}
      >
        <div className="navContentsWrapper">
          <div className="navContents">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <div className="navSubNav">
            {item.subNav && subNav
              ? item.closedIcon
              : item.subNav
                ? item.openIcon
                : null}
          </div>
        </div>
      </li>

      {subNav && (
        <ul className="subNavItemsWrapper">
          {item.subNav.map((sub, index) =>
            <>
              {"subNav" in sub ?
                <>
                  <li
                    key={sub.id + index}
                    className={`navItems ${(match || isMaster) && "active"} `}
                    onClick={() => handleSubNavClick(sub)}
                  >
                    <div className="navContentsWrapper">
                      <div className="">
                        {sub.icon}
                      </div>
                      <span>{sub.title}</span>
                      <div className="navSubNav">
                        {sub.subNav && subSubNav.status && subSubNav.index == sub.id
                          ? sub.closedIcon
                          : sub.subNav
                            ? sub.openIcon
                            : null}
                      </div>
                    </div>
                  </li>

                  {(subSubNav.status && subSubNav.index == sub.id) && (
                    <ul className="subNavitemsWrapper">
                      {sub?.subNav?.map(elem => <li
                        key={elem.id}
                        className={`subNavItems ${isActiveLink(elem) && "active"} pl-2 `}
                        onClick={() => handleSubNavClick(elem)}
                      >
                        <RemoveIcon /> {elem.title}
                      </li>
                      )}
                    </ul>
                  )}

                </>
                : <li
                  key={sub.id + index}
                  className={`subNavItems ${match && "active"} `}
                  onClick={() => handleClick(sub)}
                >
                  <RemoveIcon /> {sub.title}
                </li>
              }
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default GoTo;
