import React from "react";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper1: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="category"
      label="Category"
      name="category"
      placeholder="Can be left empty"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="search"
                variant="outlined"
                required
                fullWidth
                id="search"
                label="Search"
                placeholder="Search here e.g Ram"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Downshift id="downshift-options">
                {({
                  clearSelection,
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  highlightedIndex,
                  inputValue,
                  isOpen,
                  openMenu,
                  selectedItem
                }) => {
                  const {
                    onBlur,
                    onChange,
                    onFocus,
                    ...inputProps
                  } = getInputProps({
                    onChange: event => {
                      if (event.target.value === "") {
                        clearSelection();
                      }
                    },
                    onFocus: openMenu
                  });

                  return (
                    <div className={classes.container}>
                      {renderInput({
                        fullWidth: true,
                        classes,
                        InputLabelProps: getLabelProps({ shrink: true }),
                        InputProps: { onBlur, onChange, onFocus },
                        inputProps
                      })}

                      <div {...getMenuProps()}>
                        {isOpen ? (
                          <Paper className={classes.paper1} square>
                            {getSuggestions(inputValue, {
                              showEmpty: true
                            }).map((suggestion, index) =>
                              renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({
                                  item: suggestion.label
                                }),
                                highlightedIndex,
                                selectedItem
                              })
                            )}
                          </Paper>
                        ) : null}
                      </div>
                    </div>
                  );
                }}
              </Downshift>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button>
        </form>
      </div>
    </Container>
  );
}