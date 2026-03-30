@echo off
REM SEO Optimization Verification Script for Windows

echo.
echo 🔍 Verifying SEO Optimization Implementation...
echo =============================================
echo.

setlocal enabledelayedexpansion

set "all_exist=true"
set "file_count=0"

REM Check if files exist
echo ✓ Checking core files...
echo.

for %%F in (
  "app\layout.tsx"
  "app\page.tsx"
  "app\sitemap.ts"
  "app\robots.ts"
  "app\structured-data.tsx"
  "next.config.ts"
  "public\.well-known\humans.txt"
  "public\.well-known\security.txt"
  ".env.example"
  "SEO-OPTIMIZATION.md"
  "SEO-QUICK-START.md"
  "SEO-IMPLEMENTATION-TIMELINE.md"
) do (
  if exist %%F (
    echo   ✓ %%F
    set /a file_count+=1
  ) else (
    echo   ✗ %%F (missing)
    set "all_exist=false"
  )
)

echo.
echo =============================================
echo.

if "%all_exist%"=="true" (
  echo ✨ All SEO files are in place!
  echo.
  echo 📋 Next Steps:
  echo   1. Read SEO-QUICK-START.md for instructions
  echo   2. Upload OG image to public\og-image.png
  echo   3. Create .env.local with your domain
  echo   4. Run: npm run build
  echo   5. Run: npm run start
  echo   6. Register with Google Search Console
) else (
  echo ⚠️  Some files may be missing. Check above.
)

echo.
echo =============================================
echo For detailed information, see:
echo   📄 SEO-QUICK-START.md (recommended first read^)
echo   📄 SEO-OPTIMIZATION.md (comprehensive guide^)
echo   📄 SEO-IMPLEMENTATION-TIMELINE.md (step-by-step^)
echo.
echo.
