function mapValueAsKeyValue(obj = {}, keysObj = null | {}) {
    if (keysObj)
        return Object.fromEntries(
            Object.entries(keysObj).map(([key, value]) => [value, obj[key]])
        );

    return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [val, val])
    );
}

function getInIndianFormat(n) {
    if (n) return Number(n).toLocaleString('en');
    if (n === 0) return Number(n).toLocaleString('en');
    return '';
}

async function getS3UrlForMediaObject({ type, name }) {
    return new Promise(async (resolve, reject) => {
        const headers = new Headers({
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });
        const requestBody = [
            {
                mime_type: type,
                file_name: name
            }
        ];

        try {
            let response = await fetch(`${''}getSignedUrl`, {
                headers,
                method: 'POST',
                body: JSON.stringify(requestBody)
            });
            response = response.json();
            resolve(response);
        } catch (e) {
            reject(new Error('Unable To Upload'));
        }
    });
}

function getTableHeaderColor(d) {
    let value = +d;
    return value >= 60 && value <= 100
        ? '#006666'
        : value >= 40 && value <= 60
            ? '#008080'
            : value >= 20 && value <= 40
                ? '#66b2b2'
                : value > 0 && value < 20
                    ? '#b2d8d8'
                    : '#F4FDF9';
}

function getColor(d) {
    let value = +d;
    return value >= 60 && value <= 100
        ? '#ffb400'
        : value >= 40 && value < 60
            ? '#ffc100'
            : value >= 20 && value < 40
                ? '#ffe700'
                : value >= 0 && value < 20
                    ? '#f0ff00'
                    : 'white';
}

function getTextColor(d) {
    return d >= 60 && d <= 100
        ? 'white'
        : d >= 40 && d <= 60
            ? 'white'
            : d >= 10 && d <= 40
                ? 'white'
                : 'black';
}

async function callApi({ url = '', method = 'GET', body = {} }) {
    try {
        let response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        response = await response.json();
        if (response.ok || response.success) {
            return { caughtError: false, message: 'Successfully Updated.' };
        } else {
            return { caughtError: true, message: 'Something went wrong.' };
        }
    } catch (e) {
        return { caughtError: true, message: 'Something went wrong.' };
    }
}

function timeSince(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now';
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == 'string') return format[list_choice];
            else
                return (
                    Math.floor(seconds / format[2]) +
                    ' ' +
                    format[1] +
                    ' ' +
                    token
                );
        }
    return time;
}

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

async function uploadMediaToS3(file) {
    const response = await getS3UrlForMediaObject(file);
    try {
        const { success, data } = response;
        const { url, file_alias } = data[0];
        if (success) {
            try {
                let uploadStatus = await fetch(url, {
                    method: 'PUT',
                    body: file
                });
                if (uploadStatus) return file_alias;
            } catch (e) {
                return e;
            }
        }
        return new Error('Something went wrong !. Try uploading again');
    } catch (e) {
        return e;
    }
}

function getPosition(element) {
    if (element) {
        let { top, left, bottom } = element.getBoundingClientRect();
        const { innerHeight } = window;
        if (top > innerHeight / 2) {
            top = top - (bottom - top);
        } else {
            // top = top - 200
        }
        return { left: left + 70 + 'px', top: top + 'px' };
    }
}

function scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
        currentTime = 0,
        increment = 20;

    var animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

export {
    callApi,
    timeSince,
    debounce,
    mapValueAsKeyValue,
    uploadMediaToS3,
    getColor,
    getPosition,
    getInIndianFormat,
    scrollLeft,
    getTextColor,
    getTableHeaderColor
};
