import React from "react";
import styles from "./filters.module.css";
import { Button, Radio, ResponsiveGrid } from "../atoms";
import filtersOptions from "../../constants/filters.json";
import classNames from "classnames";

function Filters({ onClear, appliedFilters, onFilterChange }) {
  return (
    <ResponsiveGrid className={styles.container}>
      {filtersOptions.map(({ label, key: optionKey, choices }) => (
        <div key={optionKey}>
          <h4 className={styles.optionHeading}>{label}</h4>
          <div
            className={classNames(
              "mt-12",
              styles["choice-container"],
              choices.length > 3 && styles["multi-columns"]
            )}
          >
            {choices.map(({ label: choiceLabel, value: choiceValue }) => (
              <Radio
                label={choiceLabel}
                key={choiceValue}
                id={`${optionKey}-${choiceValue}`}
                value={choiceValue}
                name={optionKey}
                checked={appliedFilters[optionKey] === choiceValue}
                onChange={() => onFilterChange(optionKey, choiceValue)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex align-items-end justify-content-end">
        <Button secondary onClick={onClear}>
          Clear filter
        </Button>
      </div>
    </ResponsiveGrid>
  );
}

export default React.memo(Filters);
