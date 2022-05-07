import { Fragment } from "react"
import { Box, Rating, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import date from "date-and-time"

const pattern = date.compile("MMM D, YYYY")

const ReviewTextField = styled(TextField)(() => ({
    "& fieldset": {
        borderRadius: 0,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        fontSize: "1.29em",
    },
    "& .MuiFormHelperText-root.Mui-error": {
        fontWeight: 600,
        backgroundColor: "white",
        margin: 0,
        paddingTop: 3,
        paddingLeft: 14,
        paddingRight: 14,
    },
}))

const StyledSelect = styled(Select)(() => ({
    "& .MuiSelect-select": {
        paddingTop: 14,
        paddingRight: 14,
        paddingBottom: 14,
        paddingLeft: 14,
    },
    "& .MuiSelect-icon": {
        color: "white",
    },
}))

function LeaveAReviewFields({
    rating,
    comment,
    orderItemID,
    handleOrderOnChange,
    handleRatingOnChange,
    handleTextFieldOnBlur,
    handleTextFieldOnChange,
    formValidationError,
    formValidationErrorMessage,
    unreviewedOrderItems,
}) {
    return (
        <Fragment>
            <Box
                sx={{
                    paddingLeft: 3,
                    paddingRight: 3,
                    paddingTop: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <FormControl fullWidth>
                    <StyledSelect
                        value={orderItemID}
                        displayEmpty
                        onChange={handleOrderOnChange}
                        sx={{
                            borderRadius: 0,
                            background: "linear-gradient(62deg, #6faeed 0%, #c899f5 100%)",
                            color: "white",
                            fontWeight: 500,
                            margin: 0,
                        }}
                        disabled={!unreviewedOrderItems}
                    >
                        <MenuItem disabled value={""}>
                            Select Order
                        </MenuItem>
                        {unreviewedOrderItems &&
                            unreviewedOrderItems.map((unreviewedOrderItem) => {
                                return (
                                    <MenuItem value={unreviewedOrderItem.id}>{`Delivered on ${date.format(
                                        new Date(unreviewedOrderItem.order.updatedDate),
                                        pattern
                                    )} - Order #${unreviewedOrderItem.order.id}`}</MenuItem>
                                )
                            })}
                    </StyledSelect>
                </FormControl>
                <Box sx={{ mt: 2.5, mb: 2 }}>
                    <Rating
                        name="read-only"
                        defaultValue={3}
                        value={rating}
                        emptyIcon={
                            <StarOutlineSharp
                                sx={{
                                    color: "black",
                                    fontSize: {
                                        xs: 32,
                                        md: 40,
                                    },
                                    ml: {
                                        xs: 0.5,
                                        md: 2,
                                    },
                                    mr: {
                                        xs: 0.5,
                                        md: 2,
                                    },
                                }}
                            />
                        }
                        icon={
                            <StarSharp
                                sx={{
                                    color: "black",
                                    fontSize: {
                                        xs: 32,
                                        md: 40,
                                    },
                                    ml: {
                                        xs: 0.5,
                                        md: 2,
                                    },
                                    mr: {
                                        xs: 0.5,
                                        md: 2,
                                    },
                                }}
                            />
                        }
                        onChange={handleRatingOnChange}
                    />
                </Box>
                <ReviewTextField
                    id="outlined-basic"
                    multiline
                    minRows={5}
                    maxRows={19}
                    fullWidth
                    label="Comment (Optional)"
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            fontWeight: 600,
                            fontSize: 20,
                        },
                    }}
                    variant="outlined"
                    inputProps={{
                        style: {
                            fontSize: 14,
                        },
                    }}
                    value={comment}
                    error={formValidationError}
                    helperText={formValidationErrorMessage}
                    onBlur={handleTextFieldOnBlur}
                    onChange={handleTextFieldOnChange}
                    sx={{ backgroundColor: "#F6F6F6", width: "100%" }}
                />
            </Box>
        </Fragment>
    )
}

export default LeaveAReviewFields
