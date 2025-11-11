import React from "react";
import { useFetch, STATUS } from "../../hooks/useFetch";
import "./FetchDemo.css";

const LIMIT = 5;

const PRESET_URLS = [
  { label: "Products", url: `https://dummyjson.com/products?limit=${LIMIT}` },
  { label: "Users", url: "https://dummyjson.com/users?limit=3" },
  { label: "Posts", url: "https://dummyjson.com/posts?limit=4" },
  { label: "Single Product", url: "https://dummyjson.com/products/1" },
  {
    label: "JSONPlaceholder",
    url: "https://jsonplaceholder.typicode.com/posts?_limit=3",
  },
];

const FetchDemo = () => {
  const [url, setUrl] = React.useState(
    `https://dummyjson.com/products?limit=${LIMIT}`
  );
  const [inputUrl, setInputUrl] = React.useState(url);
  const [urlError, setUrlError] = React.useState("");
  const { data, status, error, refetch, cancel,duration } = useFetch(inputUrl);

  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) {
      return "URL is required";
    }

    try {
      const urlObj = new URL(inputUrl);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return "URL must use HTTP or HTTPS protocol";
      }
      return "";
    } catch {
      return "Invalid URL format";
    }
  };

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);
    const error = validateUrl(newUrl);
    setUrlError(error);
  };

  const handleFetch = () => {
    const error = validateUrl(url);
    if (error) {
      setUrlError(error);
      return;
    }
    setUrlError("");
    setInputUrl(url);
  };

  const handlePresetUrl = (presetUrl) => {
    setUrl(presetUrl);
    setUrlError(""); // Clear any existing errors since presets are valid
  };

  const isLoading = status === STATUS.LOADING;
  const isError = status === STATUS.ERROR;
  const isFetched = status === STATUS.FETCHED;

  return (
    <div className="fetch-demo">
      <h2>Fetch Demo</h2>

      {/* URL Input and Controls */}
      <div className="fetch-demo__controls">
        <input
          type="text"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Enter API URL"
          className={`fetch-demo__input ${
            urlError ? "fetch-demo__input--error" : ""
          }`}
        />
        {urlError && <div className="fetch-demo__input-error">{urlError}</div>}

        {/* Preset URLs */}
        <div className="fetch-demo__presets">
          <span className="fetch-demo__presets-label">Quick Examples:</span>
          <div className="fetch-demo__presets-buttons">
            {PRESET_URLS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetUrl(preset.url)}
                className="fetch-demo__preset-button"
                disabled={isLoading}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="fetch-demo__button-group">
          <button
            onClick={!isLoading && !urlError ? handleFetch : undefined}
            disabled={isLoading || !!urlError}
            className={`fetch-demo__button fetch-demo__button--primary ${
              isLoading || urlError ? "fetch-demo__button--disabled" : ""
            }`}
          >
            Fetch
          </button>
          <button
            onClick={() => {
              console.log("Cancel clicked");
              cancel();
            }}
            className={`fetch-demo__button fetch-demo__button--secondary ${
              !isLoading ? "fetch-demo__button--disabled" : ""
            }`}
            disabled={!isLoading}
          >
            Cancel
          </button>
          <button
            onClick={() => refetch(inputUrl)}
            className={`fetch-demo__button fetch-demo__button--secondary ${
              isLoading || urlError ? "fetch-demo__button--disabled" : ""
            }`}
            disabled={isLoading || !!urlError}
          >
            Refetch
          </button>
        </div>
      </div>

      {status === STATUS.ERROR && error.name === "AbortError" ? (
        <div className="fetch-demo__cancelled">Request cancelled 🛑</div>
      ) : (
        <div className={`fetch-demo__status-${status}`}>
          <strong>Fetch State:</strong>
          <div>Loading: {isLoading ? "true" : "false"}</div>
          <div>Error: {isError ? error.message : "none"}</div>
          <div>
            Data:{" "}
            {isFetched
              ? `${Array.isArray(data) ? data.length : 1} item(s)`
              : "none"}
          </div>
          <div>Response Time: {duration ? `${duration}ms` : '—'}</div>
        </div>
      )}

      {/* Fetch State Display */}

      {/* Content Display */}
      {isLoading && (
        <div className="fetch-demo__loading fetch-demo__spinner"></div>
      )}
      {error && <div className="fetch-demo__error">Error: {error.message}</div>}
      {data && (
        <div className="fetch-demo__data">
          {Array.isArray(data.products) ? (
            data.products.slice(0, 5).map((item, index) => (
              <div key={item.id || index} className="fetch-demo__data-item">
                <h3 className="fetch-demo__item-title">
                  {item.title || `Item ${index + 1}`}
                </h3>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="fetch-demo__item-image"
                />
                <p className="fetch-demo__item-content">
                  {item.description ||
                    JSON.stringify(item).slice(0, 100) + "..."}
                </p>
                <p className="fetch-demo__item-extra">Price: ${item.price}</p>
              </div>
            ))
          ) : (
            <div className="fetch-demo__data">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { FetchDemo };
