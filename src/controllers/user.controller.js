import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("Req body", req.body);
    // res.json({
    //     message: "OK"
    // });

    const { fullname, email, username, password } = req.body;
    console.log("email", email);

    if (!fullname || !email || !username || !password) {
        return res.status(400).json({
            message: "All fields are required",
            status: 400
        })
    }

    const userExists = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (userExists) {
        return res.status(409).json({
            message: "User already exists",
            status: 409
        })
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        return res.status(400).json({
            message: "Avatar is required",
            status: 400
        })
    }

    const avtar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avtar) {
        return res.status(400).json({
            message: "Avatar is required",
            status: 400
        })
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json({
            message: "Something went wrong",
            status: 500
        })
    }

    return res.status(201).json({
        message: "User created successfully",
        status: 201,
        data: createdUser
    })
})

const login = asyncHandler(async (req, res) => {
    res.json({
        message: "OK"
    })
})

export { registerUser, login }