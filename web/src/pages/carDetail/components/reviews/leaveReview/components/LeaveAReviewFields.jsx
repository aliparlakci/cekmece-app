import { Fragment } from "react"
import { Box, Rating, TextField } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

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

function LeaveAReviewFields({
    rating,
    comment,
    handleRatingOnChange,
    handleTextFieldOnBlur,
    handleTextFieldOnChange,
    formValidationError,
    formValidationErrorMessage,
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
                <Box sx={{ mt: 2, mb: 2 }}>
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
