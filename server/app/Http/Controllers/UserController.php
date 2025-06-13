<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function addUser(Request $request)
    {
        // รายชื่อฟิลด์ที่อนุญาตให้สร้าง (ต้องตรงกับ fillable)
        $data = $request->only([
            'name',
            'email',
            'address',
            'faculty',
            'field_study',
            'phone_number',
            'position',
            'position_work',
            'register_status',
            'role',
            'img_name',
            'img_path'
        ]);

        // สร้างผู้ใช้ใหม่
        $user = User::create($data);

        return response()->json([
            'message' => 'เพิ่มผู้ใช้เรียบร้อยแล้ว',
            'data' => $user
        ]);
    }

    public function getUsers(Request $request)
    {
        // ดึงข้อมูลผู้ใช้ทั้งหมด
        $users = User::all();

        return response()->json([
            'users' => $users,
            'sso_user' => $request->sso_user
        ]);
    }

    public function getUserById($id)
    {
        // ดึงข้อมูลผู้ใช้ตาม ID
        $user = User::findOrFail($id);

        return response()->json($user);
    }

    public function deleteUser($id)
    {
        // ค้นหาผู้ใช้ตาม ID
        $user = User::findOrFail($id);

        // ลบผู้ใช้
        $user->delete();

        return response()->json([
            'message' => 'ลบผู้ใช้เรียบร้อยแล้ว',
            'data' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // รายชื่อฟิลด์ที่อนุญาตให้อัปเดต (ต้องตรงกับ fillable)
        $data = $request->only([
            'name',
            'email',
            'address',
            'faculty',
            'field_study',
            'phone_number',
            'position',
            'position_work',
            'register_status',
            'role',
            'img_name',
            'img_path'
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'อัปเดตข้อมูลเรียบร้อยแล้ว',
            'data' => $user
        ]);
    }
}
