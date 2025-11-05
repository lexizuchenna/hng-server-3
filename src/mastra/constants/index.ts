export const warmUpOptions = [
  ["5 min light jogging", "10 arm circles", "Leg swings x15"],
  ["3 min jump rope", "Dynamic stretches", "Hip rotations x10"],
  ["Walk in place (3 min)", "Knee lifts", "Shoulder rolls x15"],
  ["5 min brisk walking", "10 torso twists", "Ankle rotations x10"],
  ["2 min shadow boxing", "Arm swings", "Side lunges x10"],
  [
    "Elliptical or cycling (5 min)",
    "Light dynamic stretching",
    "High knees (30 sec)",
  ],
];

export const coolDownOptions = [
  [
    "3 min walking",
    "Static stretches (hamstrings, calves)",
    "Deep breathing (2 min)",
  ],
  [
    "Gentle yoga (5 min)",
    "Neck and shoulder stretch",
    "Seated breathing practice",
  ],
  ["Foam rolling (5 min)", "Hamstring stretch", "Child’s pose (2 min)"],
  [
    "Slow march (3 min)",
    "Hip flexor stretch",
    "Box breathing (4-4-4-4 pattern)",
  ],
];

export const workoutsByGoal: Record<string, string[][]> = {
  "lose weight": [
    [
      "3 sets of 25 jumping jacks",
      "3 sets of 20 squats",
      "3 rounds of 30-sec mountain climbers",
      "15 burpees",
      "20-min jog or cycling",
    ],
    [
      "4 sets of 15 jump squats",
      "3 sets of 20 skaters",
      "3 sets of 15 push-ups",
      "HIIT: 4x (30 sec work, 20 sec rest)",
    ],
    [
      "3 sets of 15 lunges per leg",
      "3 sets of 20 bicycle crunches",
      "3x45-sec plank hold",
      "15-min brisk walk",
    ],
    [
      "Circuit x3: 10 burpees, 20 air squats, 10 push-ups, 20 mountain climbers",
      "Finish: 20-min steady-state cardio",
    ],
  ],

  "build muscle": [
    [
      "4 sets of 10 push-ups",
      "4 sets of 12 lunges per leg",
      "4 sets of 15 squats",
      "3 sets of 1-min planks",
      "Optional: dumbbell work",
    ],
    [
      "4 sets of bench press or push-ups",
      "4 sets of rows (barbell or bodyweight)",
      "3 sets of shoulder press",
      "3 sets of bicep curls",
    ],
    [
      "5 sets of squats",
      "3 sets of deadlifts",
      "3 sets of calf raises",
      "3 sets of glute bridges",
    ],
    [
      "Day 1 (Push): Chest press, Shoulder press, Triceps dips (3x12 each)",
      "Day 2 (Pull): Rows, Bicep curls, Lat pull-downs (3x12 each)",
    ],
  ],

  "improve endurance": [
    [
      "Jog (25 min)",
      "3 sets of 1-min jump rope",
      "3 sets of 20 high knees",
      "20-min cycling",
    ],
    [
      "Interval run: 4x(2 min run + 1 min walk)",
      "3 sets of 15 squats",
      "3 sets of 10 push-ups",
      "Stretch for 10 min",
    ],
    [
      "3 rounds: 20 jump squats, 20 mountain climbers, 15 push-ups, 30-sec plank",
      "Finish with 10-min jog",
    ],
    [
      "Cycling or jogging (40 min)",
      "Bodyweight circuit (3 rounds of 5 moves)",
      "Cool-down walk (10 min)",
    ],
  ],

  "stay active": [
    [
      "15-min walk",
      "10 squats",
      "10 push-ups",
      "10 sit-ups",
      "Stretch (5 min)",
    ],
    [
      "Mobility flow (10 min)",
      "15 jumping jacks",
      "10 squats",
      "Plank (30 sec)",
    ],
    ["Bodyweight circuit: squats, lunges, push-ups, crunches (2x10 each)"],
    ["5-min desk yoga", "20 arm circles", "10 wall push-ups", "10 air squats"],
  ],
};

export const nutritionTipsBank = {
  "lose weight": [
    "Reduce added sugars and processed foods.",
    "Drink water before meals.",
    "Eat more fiber-rich vegetables.",
    "Avoid skipping breakfast — eat protein-rich meals.",
    "Track portion sizes to stay mindful.",
    "Replace soda with sparkling water or tea.",
  ],
  "build muscle": [
    "Increase protein intake with every meal.",
    "Sleep 7–9 hours to promote muscle growth.",
    "Add healthy carbs like oats and brown rice.",
    "Include post-workout shakes for recovery.",
    "Eat calorie-dense healthy foods (nuts, avocados).",
  ],
  "improve endurance": [
    "Eat complex carbs before workouts.",
    "Hydrate with electrolytes during long sessions.",
    "Snack on fruits post-workout for recovery.",
    "Include iron-rich foods for oxygen transport.",
  ],
  "stay active": [
    "Eat balanced meals with all macronutrients.",
    "Avoid excessive caffeine and sugar.",
    "Stay consistent with small, healthy habits.",
    "Hydrate well and take stretch breaks during the day.",
  ],
};

export const motivationLines = [
  "Every rep gets you closer to your goal — stay strong!",
  "You’re doing great — progress, not perfection!",
  "Discipline builds results. Keep showing up!",
  "Your body can do amazing things. Believe in it!",
  "Don’t quit. Future you will thank you for today.",
  "Small steps today create big changes tomorrow.",
  "Sweat is just your fat crying — keep pushing!",
  "You’re stronger than you think!",
];
