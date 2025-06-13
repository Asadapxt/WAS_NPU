<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;

class VerifySSOToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken(); // ดึง token จาก Authorization header

        if (!$token) {
            return response()->json(['message' => 'Unauthorized. No token provided.'], 401);
        }

        // ตรวจสอบ token กับ SSO server (เช่น ส่ง HTTP ไปเช็ค)
        $ssoResponse = Http::withToken($token)->get('https://auth-npu.extremesofts.com/api/v1/npu/auth/me');

        if ($ssoResponse->failed()) {
            return response()->json(['message' => 'Unauthorized. Invalid token.'], 401);
        }

        // แนบข้อมูล user ที่ได้จาก SSO ไว้ใน request เผื่อใช้ใน controller
        $request->merge(['sso_user' => $ssoResponse->json()]);

        return $next($request);
    }
}
