"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface CareersPageContent {
  str1En: string; str1Bn: string;
  str2En: string; str2Bn: string;
  str3En: string; str3Bn: string;
  str4En: string; str4Bn: string;
  str5En: string; str5Bn: string;
  str6En: string; str6Bn: string;
  str7En: string; str7Bn: string;
  str8En: string; str8Bn: string;
  str9En: string; str9Bn: string;
  str10En: string; str10Bn: string;
  str11En: string; str11Bn: string;
  str12En: string; str12Bn: string;
  str13En: string; str13Bn: string;
  str14En: string; str14Bn: string;
  str15En: string; str15Bn: string;
  str16En: string; str16Bn: string;
  str17En: string; str17Bn: string;
  str18En: string; str18Bn: string;
  str19En: string; str19Bn: string;
  str20En: string; str20Bn: string;
  str21En: string; str21Bn: string;
  str22En: string; str22Bn: string;
  str23En: string; str23Bn: string;
  str24En: string; str24Bn: string;
  str25En: string; str25Bn: string;
  str26En: string; str26Bn: string;
  str27En: string; str27Bn: string;
  str28En: string; str28Bn: string;
  str29En: string; str29Bn: string;
  str30En: string; str30Bn: string;
  str31En: string; str31Bn: string;
  str32En: string; str32Bn: string;
  str33En: string; str33Bn: string;
  str34En: string; str34Bn: string;
  str35En: string; str35Bn: string;
  str36En: string; str36Bn: string;
  str37En: string; str37Bn: string;
  str38En: string; str38Bn: string;
  str39En: string; str39Bn: string;
  str40En: string; str40Bn: string;
  str41En: string; str41Bn: string;
  str42En: string; str42Bn: string;
  str43En: string; str43Bn: string;
  str44En: string; str44Bn: string;
  str45En: string; str45Bn: string;
  str46En: string; str46Bn: string;
  str47En: string; str47Bn: string;
  str48En: string; str48Bn: string;
  str49En: string; str49Bn: string;
  str50En: string; str50Bn: string;
  str51En: string; str51Bn: string;
  str52En: string; str52Bn: string;
  str53En: string; str53Bn: string;
  str54En: string; str54Bn: string;
  str55En: string; str55Bn: string;
  str56En: string; str56Bn: string;
  str57En: string; str57Bn: string;
  str58En: string; str58Bn: string;
  str59En: string; str59Bn: string;
  str60En: string; str60Bn: string;
  str61En: string; str61Bn: string;
  str62En: string; str62Bn: string;
  str63En: string; str63Bn: string;
  str64En: string; str64Bn: string;
  str65En: string; str65Bn: string;
  str66En: string; str66Bn: string;
  str67En: string; str67Bn: string;
  str68En: string; str68Bn: string;
  str69En: string; str69Bn: string;
  str70En: string; str70Bn: string;
  str71En: string; str71Bn: string;
  str72En: string; str72Bn: string;
  str73En: string; str73Bn: string;
  str74En: string; str74Bn: string;
  str75En: string; str75Bn: string;
  str76En: string; str76Bn: string;
  str77En: string; str77Bn: string;
  str78En: string; str78Bn: string;
  str79En: string; str79Bn: string;
  str80En: string; str80Bn: string;
  str81En: string; str81Bn: string;
  str82En: string; str82Bn: string;
  str83En: string; str83Bn: string;
  str84En: string; str84Bn: string;
  str85En: string; str85Bn: string;
  str86En: string; str86Bn: string;
  str87En: string; str87Bn: string;
  str88En: string; str88Bn: string;
  str89En: string; str89Bn: string;
  str90En: string; str90Bn: string;
  str91En: string; str91Bn: string;
  str92En: string; str92Bn: string;
  str93En: string; str93Bn: string;
  str94En: string; str94Bn: string;
  str95En: string; str95Bn: string;
  str96En: string; str96Bn: string;
  str97En: string; str97Bn: string;
  str98En: string; str98Bn: string;
  str99En: string; str99Bn: string;
  str100En: string; str100Bn: string;
  str101En: string; str101Bn: string;
  str102En: string; str102Bn: string;
  str103En: string; str103Bn: string;
  str104En: string; str104Bn: string;
  str105En: string; str105Bn: string;
  str106En: string; str106Bn: string;
  str107En: string; str107Bn: string;
  str108En: string; str108Bn: string;
  str109En: string; str109Bn: string;
  str110En: string; str110Bn: string;
  str111En: string; str111Bn: string;
  str112En: string; str112Bn: string;
  str113En: string; str113Bn: string;
  str114En: string; str114Bn: string;
  str115En: string; str115Bn: string;
  str116En: string; str116Bn: string;
  str117En: string; str117Bn: string;
  str118En: string; str118Bn: string;
  str119En: string; str119Bn: string;
  str120En: string; str120Bn: string;
  str121En: string; str121Bn: string;
  str122En: string; str122Bn: string;
  str123En: string; str123Bn: string;
  str124En: string; str124Bn: string;
  str125En: string; str125Bn: string;
  str126En: string; str126Bn: string;
  str127En: string; str127Bn: string;
  str128En: string; str128Bn: string;
  str129En: string; str129Bn: string;
  str130En: string; str130Bn: string;
  str131En: string; str131Bn: string;
  str132En: string; str132Bn: string;
  str133En: string; str133Bn: string;
  str134En: string; str134Bn: string;
  str135En: string; str135Bn: string;
  str136En: string; str136Bn: string;
  str137En: string; str137Bn: string;
  str138En: string; str138Bn: string;
  str139En: string; str139Bn: string;
  str140En: string; str140Bn: string;
  str141En: string; str141Bn: string;
  str142En: string; str142Bn: string;
  str143En: string; str143Bn: string;
  str144En: string; str144Bn: string;
}


export const defaultCareersPageContent: CareersPageContent = {
  str1En: "Network Engineering & Maintenance", str1Bn: "নেটওয়ার্ক ইঞ্জিনিয়ারিং ও রক্ষণাবেক্ষণ",
  str2En: "Helpdesk Operations", str2Bn: "হেল্পডেস্ক অপারেশনস",
  str3En: "Infrastructure Operations", str3Bn: "ইনফ্রাস্ট্রাকচার অপারেশনস",
  str4En: "Support Technician (Field Operations)", str4Bn: "সহায়তা টেকনিশিয়ান (ফিল্ড অপারেশন)",
  str5En: "Customer Support Executive", str5Bn: "কাস্টমার সাপোর্ট এক্সিকিউটিভ",
  str6En: "Junior Network Engineer", str6Bn: "জুনিয়র নেটওয়ার্ক ইঞ্জিনিয়ার",
  str7En: "South Keraniganj", str7Bn: "দক্ষিণ কেরানীগঞ্জ",
  str8En: "Kadomtoli Office, Dhaka", str8Bn: "কদমতলী অফিস, ঢাকা",
  str9En: "Full Time", str9Bn: "ফুল টাইম",
  str10En: "We are looking for dedicated field technicians to lay fiber cables, splice optical lines, install ONTs, and troubleshoot client premises issues.", str10Bn: "আমরা ফাইবার ক্যাবল স্থাপন, অপটিক্যাল লাইন স্প্লাইসিং, ওএনটি ইনস্টল এবং গ্রাহকের সংযোগ সমস্যার সমাধান করার জন্য ডেডিকেটেড ফিল্ড টেকনিশিয়ান খুঁজছি।",
  str11En: "Manage customer queries, guide clients through router reboots, catalog support tickets, and direct field teams to fiber line breaks.", str11Bn: "গ্রাহকের জিজ্ঞাসা পরিচালনা, রাউটার রিবুট গাইডলাইন প্রদান, সাপোর্ট টিকিট ক্যাটালগ এবং ফিল্ড টিমকে লাইন মেরামতের নির্দেশ প্রদান করা।",
  str12En: "Assist in monitoring the BGP network (AS150164), configure OLT splitters, manage DNS and local caching servers (FTP, BDIX).", str12Bn: "বিজিপি নেটওয়ার্ক (AS150164) পর্যবেক্ষণ, ওএলটি স্প্লিটার কনফিগারেশন, ডিএনএস এবং লোকাল ক্যাশিং সার্ভার (এফটিপি, বিডিআইএক্স) পরিচালনায় সহায়তা করা।",
  str13En: "Prior experience in fiber splicing (laser splicing machines)", str13Bn: "ফাইবার স্প্লাইসিংয়ে (লেজার স্প্লাইসিং মেশিন) পূর্ব অভিজ্ঞতা",
  str14En: "Familiarity with OLT port configs & client router configurations", str14Bn: "ওএলটি পোর্ট এবং ক্লায়েন্ট রাউটার কনফিগারেশন সম্পর্কে ধারণা",
  str15En: "Willingness to travel around South Keraniganj neighborhoods", str15Bn: "দক্ষিণ কেরানীগঞ্জের বিভিন্ন এলাকায় যাতায়াতের মানসিকতা",
  str16En: "Excellent communication and problem-solving skills", str16Bn: "চমৎকার যোগাযোগ ও সমস্যা সমাধানের দক্ষতা",
  str17En: "Higher Secondary Certificate (HSC) or Bachelor degree", str17Bn: "উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি) বা স্নাতক ডিগ্রি",
  str18En: "Polite tone and high patience for user support", str18Bn: "গ্রাহক সেবার জন্য নম্র কণ্ঠস্বর এবং উচ্চ ধৈর্যশীলতা",
  str19En: "Basic computer knowledge (Google Sheets, ticket dashboards)", str19Bn: "বেসিক কম্পিউটার জ্ঞান (গুগল শিট, টিকিট ড্যাশবোর্ড)",
  str20En: "Ability to speak fluent Bangla (English is a plus)", str20Bn: "সাবলীল বাংলায় কথা বলার ক্ষমতা (ইংরেজি জানা অতিরিক্ত যোগ্যতা হিসেবে বিবেচিত)",
  str21En: "Diploma in Computer/Telecommunication Engineering or CCNA certified", str21Bn: "কম্পিউটার/টেলিকমিউনিকেশন ইঞ্জিনিয়ারিংয়ে ডিপ্লোমা অথবা সিসিএনএ সার্টিফাইড",
  str22En: "Familiarity with Mikrotik RouterOS and basic Linux scripting", str22Bn: "মাইক্রোটিক রাউটার ওএস এবং বেসিক লিনাক্স স্ক্রিপ্টিংয়ে ধারণা",
  str23En: "Understanding of IPv4 subnetting and dynamic BGP routing", str23Bn: "IPv4 সাবনেটিং এবং ডায়নামিক বিজিপি রাউটিং সম্পর্কে ধারণা",
  str24En: "Willingness to work in rotating shifts", str24Bn: "রোটেটিং শিফটে কাজ করার মানসিকতা",
  str25En: "Please fill in all required fields (marked with *).", str25Bn: "অনুগ্রহ করে সকল তারকা চিহ্নিত (*) প্রয়োজনীয় ক্ষেত্রগুলো পূরণ করুন।",
  str26En: "Please enter present and permanent address details.", str26Bn: "অনুগ্রহ করে বর্তমান এবং স্থায়ী ঠিকানা বিবরণ প্রদান করুন।",
  str27En: "Please agree to the certification terms and provide your signature.", str27Bn: "আবেদনপত্র জমা দিতে আপনার সম্মতি দিন এবং স্বাক্ষর প্রদান করুন।",
  str28En: "Join M Amin Network", str28Bn: "এম আমিন নেটওয়ার্ক পরিবারে যোগ দিন",
  str29En: "Careers & ", str29Bn: "ক্যারিয়ার ও ",
  str30En: "Opportunities", str30Bn: "সুযোগসমূহ",
  str31En: "Work with South Keraniganj's leading network engineers. We offer attractive bonuses, hands-on training on optical line terminals, and CCNA certifications sponsorship.", str31Bn: "দক্ষিণ কেরানীগঞ্জের শীর্ষস্থানীয় নেটওয়ার্ক ইঞ্জিনিয়ারদের সাথে কাজ করুন। আমরা আকর্ষণীয় বোনাস, অপটিক্যাল লাইনের ওপর ব্যবহারিক প্রশিক্ষণ ও সিসিএনএ সার্টিফিকেশনের সহায়তা প্রদান করি।",
  str32En: "Open Positions", str32Bn: "উন্মুক্ত পদসমূহ",
  str33En: "position found", str33Bn: "টি পদ পাওয়া গেছে",
  str34En: "positions found", str34Bn: "টি পদ পাওয়া গেছে",
  str35En: "General Application", str35Bn: "সাধারণ আবেদন",
  str36En: "Search title, department, keyword...", str36Bn: "পদবি, বিভাগ বা কিওয়ার্ড অনুসন্ধান করুন...",
  str37En: "All departments", str37Bn: "সকল বিভাগ",
  str38En: "Engineering & Maintenance", str38Bn: "ইঞ্জিনিয়ারিং ও রক্ষণাবেক্ষণ",
  str39En: "All types", str39Bn: "সকল টাইপ",
  str40En: "Full-Time", str40Bn: "পূর্ণকালীন",
  str41En: "All locations", str41Bn: "সকল লোকেশন",
  str42En: "vacancy", str42Bn: "vacancy",
  str43En: "Deadline:", str43Bn: "Deadline:",
  str44En: "Details", str44Bn: "বিস্তারিত",
  str45En: "Apply Now", str45Bn: "আবেদন করুন",
  str46En: "No open positions match your search criteria", str46Bn: "কোনো পদের সন্ধান মেলেনি",
  str47En: "Try adjusting your keywords or clearing selected filters.", str47Bn: "অনুগ্রহ করে আপনার ফিল্টার বা কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।",
  str48En: "Location:", str48Bn: "অবস্থান:",
  str49En: "Vacancy:", str49Bn: "শূন্যপদ:",
  str50En: "position", str50Bn: "টি",
  str51En: "Salary:", str51Bn: "বেতন:",
  str52En: "Deadline:", str52Bn: "শেষ সময়:",
  str53En: "About the Role:", str53Bn: "ভূমিকা সম্পর্কে:",
  str54En: "Candidate Requirements:", str54Bn: "প্রার্থীর যোগ্যতা ও প্রয়োজনীয়তা:",
  str55En: "Close", str55Bn: "বন্ধ করুন",
  str56En: "Employment Application", str56Bn: "কর্মসংস্থান আবেদনপত্র",
  str57En: "Position Applied For:", str57Bn: "আবেদনকৃত পদ:",
  str58En: "Personal", str58Bn: "ব্যক্তিগত",
  str59En: "Education", str59Bn: "শিক্ষা",
  str60En: "Experience", str60Bn: "অভিজ্ঞতা",
  str61En: "Questions", str61Bn: "প্রশ্নাবলী",
  str62En: "Review & Submit", str62Bn: "রিভিউ ও সাবমিট",
  str63En: "Experienced", str63Bn: "অভিজ্ঞ",
  str64En: "Fresh", str64Bn: "নতুন (অভিজ্ঞতাহীন)",
  str65En: "Full Name (English as per Certificate) *", str65Bn: "পূর্ণ নাম (সার্টিফিকেট অনুযায়ী ইংরেজি) *",
  str66En: "Full Name (Bangla) *", str66Bn: "পূর্ণ নাম (বাংলা) *",
  str67En: "Fathers Name", str67Bn: "পিতার নাম",
  str68En: "Father's Occupation", str68Bn: "পিতার পেশা",
  str69En: "Mothers Name", str69Bn: "মাতার নাম",
  str70En: "Mother's Occupation", str70Bn: "মাতার পেশা",
  str71En: "Date of Birth *", str71Bn: "জন্ম তারিখ *",
  str72En: "Place of Birth", str72Bn: "জন্মস্থান",
  str73En: "Gender", str73Bn: "লিঙ্গ",
  str74En: "Male", str74Bn: "পুরুষ",
  str75En: "Female", str75Bn: "নারী",
  str76En: "Other", str76Bn: "অন্যান্য",
  str77En: "Blood Group", str77Bn: "রক্তের গ্রুপ",
  str78En: "Marital Status", str78Bn: "বৈবাহিক অবস্থা",
  str79En: "Single", str79Bn: "অবিবাহিত",
  str80En: "Married", str80Bn: "বিবাহিত",
  str81En: "Divorced", str81Bn: "তালাকপ্রাপ্ত",
  str82En: "Widowed", str82Bn: "বিধবা/বিপত্নীক",
  str83En: "Spouse's Name", str83Bn: "স্বামী/স্ত্রীর নাম",
  str84En: "No. of Children", str84Bn: "সন্তানের সংখ্যা",
  str85En: "Religion", str85Bn: "ধর্ম",
  str86En: "Nationality", str86Bn: "জাতীয়তা",
  str87En: "NID or BRC Card No *", str87Bn: "এনআইডি অথবা জন্ম নিবন্ধন নং *",
  str88En: "Contact Mobile Number *", str88Bn: "মোবাইল নম্বর *",
  str89En: "Email Address *", str89Bn: "ইমেইল ঠিকানা *",
  str90En: "Emergency Contact Phone", str90Bn: "জরুরি যোগাযোগ নম্বর",
  str91En: "Present Address *", str91Bn: "বর্তমান ঠিকানা *",
  str92En: "Permanent Address *", str92Bn: "স্থায়ী ঠিকানা *",
  str93En: "Same as Present", str93Bn: "বর্তমান ঠিকানার অনুরূপ",
  str94En: "Educational Qualifications", str94Bn: "শিক্ষাগত যোগ্যতা",
  str95En: "Master's (MBA/MSc/MA)", str95Bn: "মাস্টার্স (এমবিএ/এমএসসি)",
  str96En: "Bachelor's (BBA/BSc/BA)", str96Bn: "স্নাতক (বিবিএ/বিএসসি)",
  str97En: "HSC / Diploma", str97Bn: "এইচএসসি / ডিপ্লোমা",
  str98En: "SSC / O' Level", str98Bn: "এসএসসি / ও লেভেল",
  str99En: "JSC / Equivalent", str99Bn: "জেএসসি / সমমান",
  str100En: "Other Qualifications (Licenses, Skills, Trainings, Awards, Achievements)", str100Bn: "অন্যান্য যোগ্যতা (লাইসেন্স, দক্ষতা, প্রশিক্ষণ, পুরষ্কার, অর্জন)",
  str101En: "Work Experience", str101Bn: "কাজের অভিজ্ঞতা (পূর্ববর্তী চাকরি)",
  str102En: "Add Experience Row", str102Bn: "চাকরি যোগ করুন",
  str103En: "Remove", str103Bn: "বাতিল",
  str104En: "Company Name", str104Bn: "প্রতিষ্ঠানের নাম",
  str105En: "Designation", str105Bn: "পদবি",
  str106En: "Duration (From & To)", str106Bn: "সময়সীমা (শুরু ও শেষ)",
  str107En: "Monthly Salary (TK)", str107Bn: "মাসিক বেতন (টাকা)",
  str108En: "Reason for Leaving", str108Bn: "চাকরি ছাড়ার কারণ",
  str109En: "Extra-Curricular Activities", str109Bn: "সহ-শিক্ষা কার্যক্রম",
  str110En: "Do you consider yourself a highly motivated person? Why?", str110Bn: "আপনি কি নিজেকে উচ্চ অনুপ্রাণিত ব্যক্তি মনে করেন? কেন?",
  str111En: "What environments are you comfortable working in?", str111Bn: "কোন পরিবেশে কাজ করতে আপনি সবচেয়ে স্বাচ্ছন্দ্য বোধ করেন?",
  str112En: "As a part of a team", str112Bn: "টিমের অংশ হিসেবে",
  str113En: "Leading a team", str113Bn: "টিম লিড হিসেবে",
  str114En: "Work Individually", str114Bn: "এককভাবে",
  str115En: "What are your expectations from M Amin Network?", str115Bn: "আমাদের সংস্থার নিকট আপনার প্রত্যাশা কি?",
  str116En: "Criminal offence history?", str116Bn: "ফৌজদারি মামলার রেকর্ড রয়েছে?",
  str117En: "Yes", str117Bn: "হ্যাঁ",
  str118En: "No", str118Bn: "না",
  str119En: "Any relative working in M Amin Network?", str119Bn: "কোন আত্মীয় আমাদের সংস্থায় কর্মরত আছেন?",
  str120En: "References (Provide Two)", str120Bn: "তথ্য সূত্র/রেফারেন্স (দুটি প্রদান করুন)",
  str121En: "Reference 1", str121Bn: "রেফারেন্স ১",
  str122En: "Reference 2", str122Bn: "রেফারেন্স ২",
  str123En: "Confirm Application Summary", str123Bn: "আবেদনপত্রের সারসংক্ষেপ নিশ্চিত করুন",
  str124En: "Candidate Type:", str124Bn: "আবেদনকারীর ধরন:",
  str125En: "Applicant Name (EN):", str125Bn: "নাম (ইংরেজি):",
  str126En: "Mobile Phone:", str126Bn: "মোবাইল নম্বর:",
  str127En: "Email ID:", str127Bn: "ইমেইল:",
  str128En: "NID/BRC NO:", str128Bn: "এনআইডি/জন্ম নিবন্ধন:",
  str129En: "Date of Birth:", str129Bn: "জন্ম তারিখ:",
  str130En: "Expected Salary Range (Monthly TK) *", str130Bn: "প্রত্যাশিত মাসিক বেতন (টাকা) *",
  str131En: "Application Date", str131Bn: "আবেদনের তারিখ",
  str132En: "Applicant Certification", str132Bn: "আবেদনকারীর ঘোষণা",
  str133En: "I certify that the information contained in this employment application is true and complete to the best of my knowledge. I understand that false or misleading information or omissions may result in immediate rejection of my application or termination of employment if hired.", str133Bn: "আমি ঘোষণা করছি যে, এই আবেদনপত্রে আমার প্রদত্ত সকল তথ্য সত্য, সঠিক এবং সম্পূর্ণ। আমি বুঝতে পারছি যে, কোনো অসত্য, মিথ্যা বা বিভ্রান্তিকর তথ্য প্রদান করা হলে বা কোনো গুরুত্বপূর্ণ তথ্য গোপন রাখা হলে আমার আবেদনপত্র সরাসরি বাতিল করা হতে পারে বা চাকরিতে যোগদানের পরও যেকোনো সময় চাকরি থেকে অব্যাহতি দেওয়া হতে পারে।",
  str134En: "Applicant Signature (Type Name) *", str134Bn: "আবেদনকারীর স্বাক্ষর (আপনার নাম) *",
  str135En: "I certify and agree to the above terms *", str135Bn: "আমি স্বাক্ষর করছি এবং উপরোক্ত শর্তাবলীতে সম্মত আছি *",
  str136En: "Back", str136Bn: "পূর্ববর্তী",
  str137En: "Continue", str137Bn: "পরবর্তী",
  str138En: "Submitting...", str138Bn: "জমাদান হচ্ছে...",
  str139En: "Submit Application", str139Bn: "আবেদন জমা দিন",
  str140En: "Application Received Successfully!", str140Bn: "আবেদনপত্র সফলভাবে গৃহীত হয়েছে!",
  str141En: "Thank you", str141Bn: "ধন্যবাদ",
  str142En: "We have saved your application request for", str142Bn: "আমরা আপনার আবেদনপত্রটি সংরক্ষণ করেছি:",
  str143En: "Our HR team will review your qualifications, references, and credentials as per your submitted employment form. If your background aligns with our operational needs, our office coordinator will contact you to schedule an interview at our Kadomtoli branch.", str143Bn: "আমাদের এইচআর বিভাগ আপনার প্রদত্ত তথ্য সূত্র, শিক্ষাগত যোগ্যতা এবং অভিজ্ঞতার রেকর্ড পর্যালোচনা করবে। আপনার আবেদনটি যদি আমাদের চাহিদার সাথে সামঞ্জস্যপূর্ণ হয়, তবে পরবর্তী সরাসরি সাক্ষাৎকারের জন্য আমাদের অফিস কো-অর্ডিনেটর কদমতলী শাখা থেকে আপনার সাথে যোগাযোগ করবেন।",
  str144En: "Close Window", str144Bn: "উইন্ডো বন্ধ করুন",
};



export default function CareersPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<CareersPageContent>(defaultCareersPageContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const s = localStorage.getItem("m_amin_careers_page_content");
    if (s) {
      try { setContent(JSON.parse(s)); } catch { /* ignore */ }
    } else {
      localStorage.setItem("m_amin_careers_page_content", JSON.stringify(defaultCareersPageContent));
    }
  }, [router]);

  const save = () => {
    localStorage.setItem("m_amin_careers_page_content", JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = <K extends keyof CareersPageContent>(key: K, val: CareersPageContent[K]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Careers Page Content</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all static text content dynamically.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
              <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          <button onClick={save} className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-[0.98]">
            <Lucide.Save className="w-4 h-4" /> Save Content
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        
          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 1</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str1En} onChange={e => updateField("str1En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str1Bn} onChange={e => updateField("str1Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 2</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str2En} onChange={e => updateField("str2En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str2Bn} onChange={e => updateField("str2Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 3</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str3En} onChange={e => updateField("str3En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str3Bn} onChange={e => updateField("str3Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 4</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str4En} onChange={e => updateField("str4En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str4Bn} onChange={e => updateField("str4Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 5</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str5En} onChange={e => updateField("str5En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str5Bn} onChange={e => updateField("str5Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 6</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str6En} onChange={e => updateField("str6En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str6Bn} onChange={e => updateField("str6Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 7</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str7En} onChange={e => updateField("str7En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str7Bn} onChange={e => updateField("str7Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 8</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str8En} onChange={e => updateField("str8En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str8Bn} onChange={e => updateField("str8Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 9</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str9En} onChange={e => updateField("str9En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str9Bn} onChange={e => updateField("str9Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 10</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str10En} onChange={e => updateField("str10En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str10Bn} onChange={e => updateField("str10Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 11</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str11En} onChange={e => updateField("str11En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str11Bn} onChange={e => updateField("str11Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 12</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str12En} onChange={e => updateField("str12En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str12Bn} onChange={e => updateField("str12Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 13</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str13En} onChange={e => updateField("str13En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str13Bn} onChange={e => updateField("str13Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 14</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str14En} onChange={e => updateField("str14En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str14Bn} onChange={e => updateField("str14Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 15</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str15En} onChange={e => updateField("str15En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str15Bn} onChange={e => updateField("str15Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 16</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str16En} onChange={e => updateField("str16En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str16Bn} onChange={e => updateField("str16Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 17</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str17En} onChange={e => updateField("str17En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str17Bn} onChange={e => updateField("str17Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 18</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str18En} onChange={e => updateField("str18En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str18Bn} onChange={e => updateField("str18Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 19</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str19En} onChange={e => updateField("str19En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str19Bn} onChange={e => updateField("str19Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 20</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str20En} onChange={e => updateField("str20En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str20Bn} onChange={e => updateField("str20Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 21</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str21En} onChange={e => updateField("str21En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str21Bn} onChange={e => updateField("str21Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 22</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str22En} onChange={e => updateField("str22En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str22Bn} onChange={e => updateField("str22Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 23</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str23En} onChange={e => updateField("str23En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str23Bn} onChange={e => updateField("str23Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 24</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str24En} onChange={e => updateField("str24En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str24Bn} onChange={e => updateField("str24Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 25</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str25En} onChange={e => updateField("str25En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str25Bn} onChange={e => updateField("str25Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 26</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str26En} onChange={e => updateField("str26En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str26Bn} onChange={e => updateField("str26Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 27</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str27En} onChange={e => updateField("str27En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str27Bn} onChange={e => updateField("str27Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 28</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str28En} onChange={e => updateField("str28En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str28Bn} onChange={e => updateField("str28Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 29</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str29En} onChange={e => updateField("str29En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str29Bn} onChange={e => updateField("str29Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 30</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str30En} onChange={e => updateField("str30En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str30Bn} onChange={e => updateField("str30Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 31</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str31En} onChange={e => updateField("str31En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str31Bn} onChange={e => updateField("str31Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 32</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str32En} onChange={e => updateField("str32En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str32Bn} onChange={e => updateField("str32Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 33</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str33En} onChange={e => updateField("str33En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str33Bn} onChange={e => updateField("str33Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 34</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str34En} onChange={e => updateField("str34En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str34Bn} onChange={e => updateField("str34Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 35</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str35En} onChange={e => updateField("str35En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str35Bn} onChange={e => updateField("str35Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 36</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str36En} onChange={e => updateField("str36En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str36Bn} onChange={e => updateField("str36Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 37</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str37En} onChange={e => updateField("str37En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str37Bn} onChange={e => updateField("str37Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 38</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str38En} onChange={e => updateField("str38En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str38Bn} onChange={e => updateField("str38Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 39</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str39En} onChange={e => updateField("str39En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str39Bn} onChange={e => updateField("str39Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 40</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str40En} onChange={e => updateField("str40En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str40Bn} onChange={e => updateField("str40Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 41</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str41En} onChange={e => updateField("str41En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str41Bn} onChange={e => updateField("str41Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 42</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str42En} onChange={e => updateField("str42En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str42Bn} onChange={e => updateField("str42Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 43</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str43En} onChange={e => updateField("str43En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str43Bn} onChange={e => updateField("str43Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 44</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str44En} onChange={e => updateField("str44En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str44Bn} onChange={e => updateField("str44Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 45</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str45En} onChange={e => updateField("str45En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str45Bn} onChange={e => updateField("str45Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 46</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str46En} onChange={e => updateField("str46En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str46Bn} onChange={e => updateField("str46Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 47</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str47En} onChange={e => updateField("str47En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str47Bn} onChange={e => updateField("str47Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 48</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str48En} onChange={e => updateField("str48En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str48Bn} onChange={e => updateField("str48Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 49</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str49En} onChange={e => updateField("str49En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str49Bn} onChange={e => updateField("str49Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 50</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str50En} onChange={e => updateField("str50En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str50Bn} onChange={e => updateField("str50Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 51</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str51En} onChange={e => updateField("str51En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str51Bn} onChange={e => updateField("str51Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 52</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str52En} onChange={e => updateField("str52En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str52Bn} onChange={e => updateField("str52Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 53</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str53En} onChange={e => updateField("str53En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str53Bn} onChange={e => updateField("str53Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 54</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str54En} onChange={e => updateField("str54En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str54Bn} onChange={e => updateField("str54Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 55</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str55En} onChange={e => updateField("str55En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str55Bn} onChange={e => updateField("str55Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 56</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str56En} onChange={e => updateField("str56En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str56Bn} onChange={e => updateField("str56Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 57</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str57En} onChange={e => updateField("str57En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str57Bn} onChange={e => updateField("str57Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 58</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str58En} onChange={e => updateField("str58En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str58Bn} onChange={e => updateField("str58Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 59</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str59En} onChange={e => updateField("str59En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str59Bn} onChange={e => updateField("str59Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 60</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str60En} onChange={e => updateField("str60En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str60Bn} onChange={e => updateField("str60Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 61</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str61En} onChange={e => updateField("str61En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str61Bn} onChange={e => updateField("str61Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 62</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str62En} onChange={e => updateField("str62En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str62Bn} onChange={e => updateField("str62Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 63</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str63En} onChange={e => updateField("str63En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str63Bn} onChange={e => updateField("str63Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 64</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str64En} onChange={e => updateField("str64En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str64Bn} onChange={e => updateField("str64Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 65</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str65En} onChange={e => updateField("str65En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str65Bn} onChange={e => updateField("str65Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 66</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str66En} onChange={e => updateField("str66En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str66Bn} onChange={e => updateField("str66Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 67</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str67En} onChange={e => updateField("str67En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str67Bn} onChange={e => updateField("str67Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 68</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str68En} onChange={e => updateField("str68En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str68Bn} onChange={e => updateField("str68Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 69</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str69En} onChange={e => updateField("str69En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str69Bn} onChange={e => updateField("str69Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 70</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str70En} onChange={e => updateField("str70En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str70Bn} onChange={e => updateField("str70Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 71</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str71En} onChange={e => updateField("str71En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str71Bn} onChange={e => updateField("str71Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 72</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str72En} onChange={e => updateField("str72En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str72Bn} onChange={e => updateField("str72Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 73</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str73En} onChange={e => updateField("str73En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str73Bn} onChange={e => updateField("str73Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 74</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str74En} onChange={e => updateField("str74En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str74Bn} onChange={e => updateField("str74Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 75</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str75En} onChange={e => updateField("str75En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str75Bn} onChange={e => updateField("str75Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 76</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str76En} onChange={e => updateField("str76En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str76Bn} onChange={e => updateField("str76Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 77</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str77En} onChange={e => updateField("str77En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str77Bn} onChange={e => updateField("str77Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 78</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str78En} onChange={e => updateField("str78En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str78Bn} onChange={e => updateField("str78Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 79</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str79En} onChange={e => updateField("str79En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str79Bn} onChange={e => updateField("str79Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 80</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str80En} onChange={e => updateField("str80En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str80Bn} onChange={e => updateField("str80Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 81</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str81En} onChange={e => updateField("str81En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str81Bn} onChange={e => updateField("str81Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 82</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str82En} onChange={e => updateField("str82En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str82Bn} onChange={e => updateField("str82Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 83</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str83En} onChange={e => updateField("str83En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str83Bn} onChange={e => updateField("str83Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 84</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str84En} onChange={e => updateField("str84En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str84Bn} onChange={e => updateField("str84Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 85</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str85En} onChange={e => updateField("str85En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str85Bn} onChange={e => updateField("str85Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 86</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str86En} onChange={e => updateField("str86En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str86Bn} onChange={e => updateField("str86Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 87</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str87En} onChange={e => updateField("str87En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str87Bn} onChange={e => updateField("str87Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 88</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str88En} onChange={e => updateField("str88En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str88Bn} onChange={e => updateField("str88Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 89</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str89En} onChange={e => updateField("str89En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str89Bn} onChange={e => updateField("str89Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 90</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str90En} onChange={e => updateField("str90En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str90Bn} onChange={e => updateField("str90Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 91</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str91En} onChange={e => updateField("str91En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str91Bn} onChange={e => updateField("str91Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 92</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str92En} onChange={e => updateField("str92En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str92Bn} onChange={e => updateField("str92Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 93</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str93En} onChange={e => updateField("str93En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str93Bn} onChange={e => updateField("str93Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 94</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str94En} onChange={e => updateField("str94En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str94Bn} onChange={e => updateField("str94Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 95</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str95En} onChange={e => updateField("str95En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str95Bn} onChange={e => updateField("str95Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 96</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str96En} onChange={e => updateField("str96En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str96Bn} onChange={e => updateField("str96Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 97</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str97En} onChange={e => updateField("str97En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str97Bn} onChange={e => updateField("str97Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 98</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str98En} onChange={e => updateField("str98En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str98Bn} onChange={e => updateField("str98Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 99</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str99En} onChange={e => updateField("str99En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str99Bn} onChange={e => updateField("str99Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 100</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str100En} onChange={e => updateField("str100En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str100Bn} onChange={e => updateField("str100Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 101</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str101En} onChange={e => updateField("str101En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str101Bn} onChange={e => updateField("str101Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 102</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str102En} onChange={e => updateField("str102En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str102Bn} onChange={e => updateField("str102Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 103</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str103En} onChange={e => updateField("str103En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str103Bn} onChange={e => updateField("str103Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 104</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str104En} onChange={e => updateField("str104En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str104Bn} onChange={e => updateField("str104Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 105</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str105En} onChange={e => updateField("str105En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str105Bn} onChange={e => updateField("str105Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 106</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str106En} onChange={e => updateField("str106En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str106Bn} onChange={e => updateField("str106Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 107</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str107En} onChange={e => updateField("str107En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str107Bn} onChange={e => updateField("str107Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 108</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str108En} onChange={e => updateField("str108En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str108Bn} onChange={e => updateField("str108Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 109</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str109En} onChange={e => updateField("str109En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str109Bn} onChange={e => updateField("str109Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 110</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str110En} onChange={e => updateField("str110En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str110Bn} onChange={e => updateField("str110Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 111</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str111En} onChange={e => updateField("str111En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str111Bn} onChange={e => updateField("str111Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 112</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str112En} onChange={e => updateField("str112En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str112Bn} onChange={e => updateField("str112Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 113</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str113En} onChange={e => updateField("str113En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str113Bn} onChange={e => updateField("str113Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 114</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str114En} onChange={e => updateField("str114En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str114Bn} onChange={e => updateField("str114Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 115</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str115En} onChange={e => updateField("str115En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str115Bn} onChange={e => updateField("str115Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 116</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str116En} onChange={e => updateField("str116En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str116Bn} onChange={e => updateField("str116Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 117</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str117En} onChange={e => updateField("str117En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str117Bn} onChange={e => updateField("str117Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 118</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str118En} onChange={e => updateField("str118En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str118Bn} onChange={e => updateField("str118Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 119</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str119En} onChange={e => updateField("str119En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str119Bn} onChange={e => updateField("str119Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 120</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str120En} onChange={e => updateField("str120En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str120Bn} onChange={e => updateField("str120Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 121</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str121En} onChange={e => updateField("str121En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str121Bn} onChange={e => updateField("str121Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 122</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str122En} onChange={e => updateField("str122En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str122Bn} onChange={e => updateField("str122Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 123</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str123En} onChange={e => updateField("str123En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str123Bn} onChange={e => updateField("str123Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 124</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str124En} onChange={e => updateField("str124En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str124Bn} onChange={e => updateField("str124Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 125</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str125En} onChange={e => updateField("str125En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str125Bn} onChange={e => updateField("str125Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 126</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str126En} onChange={e => updateField("str126En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str126Bn} onChange={e => updateField("str126Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 127</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str127En} onChange={e => updateField("str127En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str127Bn} onChange={e => updateField("str127Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 128</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str128En} onChange={e => updateField("str128En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str128Bn} onChange={e => updateField("str128Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 129</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str129En} onChange={e => updateField("str129En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str129Bn} onChange={e => updateField("str129Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 130</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str130En} onChange={e => updateField("str130En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str130Bn} onChange={e => updateField("str130Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 131</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str131En} onChange={e => updateField("str131En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str131Bn} onChange={e => updateField("str131Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 132</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str132En} onChange={e => updateField("str132En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str132Bn} onChange={e => updateField("str132Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 133</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str133En} onChange={e => updateField("str133En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str133Bn} onChange={e => updateField("str133Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 134</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str134En} onChange={e => updateField("str134En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str134Bn} onChange={e => updateField("str134Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 135</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str135En} onChange={e => updateField("str135En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str135Bn} onChange={e => updateField("str135Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 136</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str136En} onChange={e => updateField("str136En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str136Bn} onChange={e => updateField("str136Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 137</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str137En} onChange={e => updateField("str137En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str137Bn} onChange={e => updateField("str137Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 138</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str138En} onChange={e => updateField("str138En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str138Bn} onChange={e => updateField("str138Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 139</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str139En} onChange={e => updateField("str139En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str139Bn} onChange={e => updateField("str139Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 140</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str140En} onChange={e => updateField("str140En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str140Bn} onChange={e => updateField("str140Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 141</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str141En} onChange={e => updateField("str141En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str141Bn} onChange={e => updateField("str141Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 142</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str142En} onChange={e => updateField("str142En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str142Bn} onChange={e => updateField("str142Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 143</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str143En} onChange={e => updateField("str143En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str143Bn} onChange={e => updateField("str143Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 144</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str144En} onChange={e => updateField("str144En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str144Bn} onChange={e => updateField("str144Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
