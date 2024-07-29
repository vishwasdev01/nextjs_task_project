import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

// Define the types
type User = {
  first_name: string
  last_name: string
  email: string
  alternate_email: string
  password: string
  age: number
  uid?: string
}

type Data = {
  users: User[]
}

type FileData = Data[]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userUid = searchParams.get('uid')

  // Define the path to the JSON file
  const jsonFilePath = path.join(process.cwd(), './db.json')

  // Ensure the directory exists before reading the file
  await fs.mkdir(path.dirname(jsonFilePath), { recursive: true })

  // Read existing data if the file exists
  let existingData: FileData = [{ users: [] }]
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
    existingData = JSON.parse(fileContent) as FileData
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      // Re-throw error if it's not a 'file not found' error
      console.log(err)
      throw err
    }
  }

  // Ensure the first element of existingData has a "users" array
  if (!Array.isArray(existingData[0].users)) {
    existingData[0].users = []
    console.log('Initialized users array')
  }

  if (userUid) {
    // Fetch the specific user by UID
    const user = existingData[0].users.find((user) => user.uid === userUid)
    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      data: user,
      message: 'User details successfully retrieved',
    })
  } else {
    // Fetch all users
    return NextResponse.json({
      data: existingData[0].users,
      message: 'All users successfully retrieved',
    })
  }
}

export async function POST(request: NextRequest) {
  const data: User = await request.json()

  data.uid = uuidv4()

  // Hash the password before storing it
  const salt = await bcrypt.genSalt(10)
  data.password = await bcrypt.hash(data.password, salt)

  // Define the path to the JSON file
  const jsonFilePath = path.join(process.cwd(), './db.json')

  // Ensure the directory exists before writing the file
  await fs.mkdir(path.dirname(jsonFilePath), { recursive: true })

  // Read existing data if the file exists, else initialize with an empty array containing an object with a "users" array
  let existingData: FileData = [{ users: [] }]
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
    existingData = JSON.parse(fileContent) as FileData
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      // Re-throw error if it's not a 'file not found' error
      throw err
    }
  }

  // Ensure the first element of existingData has a "users" array
  if (!Array.isArray(existingData[0].users)) {
    existingData[0].users = []
  }

  // Append new data to the "users" array of the first element
  existingData[0].users.push(data)

  // Write the updated data back to the file
  await fs.writeFile(
    jsonFilePath,
    JSON.stringify(existingData, null, 2),
    'utf-8',
  )

  return NextResponse.json({
    data: data,
    message: 'Data successfully appended to the users array in the file',
  })
}

export async function PUT(request: NextRequest) {
  const data: User = await request.json()
  const { searchParams } = new URL(request.url)
  const userUid = searchParams.get('uid')
  const userEmail = data.email
  console.log(userUid)
  console.log(data)

  if (!userEmail) {
    return NextResponse.json(
      {
        message: 'Email parameter is required',
      },
      { status: 400 },
    )
  }
  if (!userUid) {
    return NextResponse.json(
      {
        message: 'UID not Found',
      },
      { status: 400 },
    )
  }

  console.log('Received data for update:', data)
  console.log('Email to update:', userEmail)

  // Define the path to the JSON file
  const jsonFilePath = path.join(process.cwd(), './db.json')

  // Ensure the directory exists before writing the file
  await fs.mkdir(path.dirname(jsonFilePath), { recursive: true })

  // Read existing data if the file exists
  let existingData: FileData = [{ users: [] }]
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
    existingData = JSON.parse(fileContent) as FileData
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      // Re-throw error if it's not a 'file not found' error
      console.log(err)
      throw err
    }
  }

  console.log('Existing data:', JSON.stringify(existingData, null, 2))

  // Ensure the first element of existingData has a "users" array
  if (!Array.isArray(existingData[0].users)) {
    existingData[0].users = []
    console.log('Initialized users array')
  }

  // Find and update the user
  const userIndex = existingData[0].users.findIndex(
    (user) => user.uid === userUid,
  )
  if (userIndex === -1) {
    return NextResponse.json(
      {
        message: 'User not found',
      },
      { status: 404 },
    )
  }

  existingData[0].users[userIndex] = data

  console.log('Updated data:', JSON.stringify(existingData, null, 2))

  // Write the updated data back to the file
  await fs.writeFile(
    jsonFilePath,
    JSON.stringify(existingData, null, 2),
    'utf-8',
  )

  return NextResponse.json({
    data: data,
    message: 'User data successfully updated',
  })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userUid = searchParams.get('uid')

  if (!userUid) {
    return NextResponse.json(
      {
        message: 'UID not Found',
      },
      { status: 400 },
    )
  }

  console.log('Received UID for deletion:', userUid)

  // Define the path to the JSON file
  const jsonFilePath = path.join(process.cwd(), './db.json')

  // Ensure the directory exists before writing the file
  await fs.mkdir(path.dirname(jsonFilePath), { recursive: true })

  // Read existing data if the file exists
  let existingData: FileData = [{ users: [] }]
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
    existingData = JSON.parse(fileContent) as FileData
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      // Re-throw error if it's not a 'file not found' error
      console.log(err)
      throw err
    }
  }

  console.log('Existing data:', JSON.stringify(existingData, null, 2))

  // Ensure the first element of existingData has a "users" array
  if (!Array.isArray(existingData[0].users)) {
    existingData[0].users = []
    console.log('Initialized users array')
  }

  // Find and remove the user
  const userIndex = existingData[0].users.findIndex(
    (user) => user.uid === userUid,
  )
  if (userIndex === -1) {
    return NextResponse.json(
      {
        message: 'User not found',
      },
      { status: 404 },
    )
  }

  // Remove the user from the array
  existingData[0].users.splice(userIndex, 1)

  console.log('Updated data:', JSON.stringify(existingData, null, 2))

  // Write the updated data back to the file
  await fs.writeFile(
    jsonFilePath,
    JSON.stringify(existingData, null, 2),
    'utf-8',
  )

  return NextResponse.json({
    message: 'User successfully deleted',
  })
}
