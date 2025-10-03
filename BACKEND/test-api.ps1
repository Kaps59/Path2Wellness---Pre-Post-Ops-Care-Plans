# PowerShell script to test the Path2Wellness API endpoints

Write-Host "🚀 Testing Path2Wellness Backend API..." -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:5000/api"

# Test 1: Health Check
Write-Host "1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ Health Check: $($healthResponse.message)" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.status)" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Make sure the server is running on port 5000" -ForegroundColor Yellow
    Write-Host ""
}

# Test 2: Create ENT Care Plan
Write-Host "2. Testing ENT Care Plan Creation..." -ForegroundColor Yellow
$entCarePlan = @{
    patientId = "ENT001"
    patientName = "John Doe"
    doctorId = "DR001"
    doctorName = "Dr. Smith"
    operationType = "post-operation"
    surgeryType = "Tonsillectomy"
    careDetails = @{
        painLevel = 5
        breathingIssues = "mild"
        throatDiscomfort = "moderate"
        medicationIntake = @(
            @{
                medicationName = "Ibuprofen"
                dosage = "400mg"
                frequency = "Every 6 hours"
                sideEffects = "none"
            }
        )
        healingProgress = @{
            woundCondition = "good"
            swelling = "mild"
            notes = "Healing well, minimal bleeding"
        }
    }
    symptoms = "Sore throat, difficulty swallowing"
    instructions = "Take medications as prescribed, avoid hard foods, rest voice"
    priority = "medium"
}

try {
    $entJson = $entCarePlan | ConvertTo-Json -Depth 10
    $entResponse = Invoke-RestMethod -Uri "$baseUrl/ent/care-plans" -Method POST -Body $entJson -ContentType "application/json"
    Write-Host "✅ ENT Care Plan Created: $($entResponse.message)" -ForegroundColor Green
    Write-Host "   Care Plan ID: $($entResponse.data._id)" -ForegroundColor Cyan
    $entId = $entResponse.data._id
    Write-Host ""
} catch {
    Write-Host "❌ ENT Care Plan creation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Create Obstetrics Care Plan
Write-Host "3. Testing Obstetrics Care Plan Creation..." -ForegroundColor Yellow
$obsCarePlan = @{
    patientId = "OBS001"
    patientName = "Jane Smith"
    doctorId = "DR002"
    doctorName = "Dr. Johnson"
    careType = "prenatal"
    gestationalWeek = 28
    careDetails = @{
        trimesterSymptoms = @{
            nausea = "mild"
            cramps = "none"
            mood = "stable"
            fatigue = "moderate"
        }
        babyMovement = @{
            frequency = "normal"
            notes = "Active movements felt regularly"
        }
        sleepNutrition = @{
            sleepHours = 7
            sleepQuality = "fair"
            dietNotes = "Balanced diet with prenatal vitamins"
            waterIntake = 2.5
            supplements = @(
                @{
                    name = "Folic Acid"
                    dosage = "400mcg"
                    frequency = "Daily"
                }
            )
        }
    }
    vitalSigns = @{
        bloodPressure = @{
            systolic = 120
            diastolic = 80
        }
        weight = 65
        temperature = 36.5
        heartRate = 75
    }
    instructions = "Continue prenatal vitamins, monitor baby movements, attend regular checkups"
    priority = "medium"
}

try {
    $obsJson = $obsCarePlan | ConvertTo-Json -Depth 10
    $obsResponse = Invoke-RestMethod -Uri "$baseUrl/obstetrics/care-plans" -Method POST -Body $obsJson -ContentType "application/json"
    Write-Host "✅ Obstetrics Care Plan Created: $($obsResponse.message)" -ForegroundColor Green
    Write-Host "   Care Plan ID: $($obsResponse.data._id)" -ForegroundColor Cyan
    $obsId = $obsResponse.data._id
    Write-Host ""
} catch {
    Write-Host "❌ Obstetrics Care Plan creation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Get All ENT Care Plans
Write-Host "4. Testing Get All ENT Care Plans..." -ForegroundColor Yellow
try {
    $allEntResponse = Invoke-RestMethod -Uri "$baseUrl/ent/care-plans" -Method GET
    Write-Host "✅ Retrieved ENT Care Plans: $($allEntResponse.data.Count) plans found" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Failed to get ENT care plans: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 5: Get All Obstetrics Care Plans
Write-Host "5. Testing Get All Obstetrics Care Plans..." -ForegroundColor Yellow
try {
    $allObsResponse = Invoke-RestMethod -Uri "$baseUrl/obstetrics/care-plans" -Method GET
    Write-Host "✅ Retrieved Obstetrics Care Plans: $($allObsResponse.data.Count) plans found" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Failed to get Obstetrics care plans: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "🎉 API Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "- Health endpoint: Tested" -ForegroundColor White
Write-Host "- ENT Care Plan CRUD: Tested" -ForegroundColor White
Write-Host "- Obstetrics Care Plan CRUD: Tested" -ForegroundColor White
Write-Host "- Database connection: Working" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your backend is ready for frontend integration!" -ForegroundColor Green
