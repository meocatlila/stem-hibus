# บันทึกค้นข้อมูลรถต้นแบบไฮบัส (STEM-HiBus) บน KidBright

ขอบเขต: แหล่งปฐมภูมิเท่านั้น (เอกสารเนคเทค/สวทช., หน้าสินค้าผู้ผลิต Gravitech/kidbright.io, คู่มือและหน้าสินค้า INEX, GitHub ของปลั๊กอิน KB Chain)  
แยกชัดระหว่าง **สิ่งที่ชุด/ผู้ผลิตระบุ** กับ **กติกาโครงงานไฮบัส** (เช่น ป้ายจอด, ตัวถังยกสูง, แอปจำลอง)

อ้างอิงข้อเท็จจริงโครงงานที่มีอยู่แล้วในรีโป: [RESEARCH.md](./RESEARCH.md) และ `infographic.html` ส่วน 03 (วิธีทำรถ) — เอกสารนี้ขยายรายละเอียดเทคนิค ไม่ขัดแย้งกับข้อสรุปเดิม

---

## 1. โมเดลการโปรแกรมหุ่นยนต์ด้วย KidBright32 / KidBright IDE

### 1.1 บทบาทของบอร์ดและ IDE

- KidBright เป็นบอร์ดสมองกลฝังตัว (embedded board) ที่พัฒนาโดยทีม Educational Technology Research ของเนคเทค เพื่อส่งเสริมการเรียนโค้ดดิ้งและ STEM; ผู้เรียนสร้างชุดคำสั่งด้วยการลากวางบล็อกใน KidBright IDE แล้วส่งไปที่บอร์ดให้ทำงานตามโปรแกรม  
  ที่มา: [kid-bright.org — KidBright at School (EN)](https://kid-bright.org/kidbright-en/)
- จดหมายเหตุ สวทช. สรุปว่า KidBright เป็นเครื่องมือเรียนโค้ดดิ้งและ STEM ในวิชาวิทยาการคำนวณ มีจอแสดงผล เซนเซอร์พื้นฐาน buzzer สวิตช์ RTC และช่องอินพุต/เอาต์พุต; รองรับ Event-driven / Multitasking และเพิ่ม Plugins ใน KidBright IDE ได้  
  ที่มา: [nstda.or.th/archives/kidbright-3](https://www.nstda.or.th/archives/kidbright-3/)
- สารบัญชุมชนยืนยันโมเดลเดียวกัน: สร้างชุดคำสั่งใน KidBright IDE แบบ Drag and Drop แล้วส่งไปที่บอร์ด  
  ที่มา: [kidbright.info](https://kidbright.info/)

### 1.2 คุณสมบัติ KidBright32 V1.6 ที่เกี่ยวกับหุ่นยนต์

หน้าสินค้าผู้จัดจำหน่ายระบุว่า KidBright32 V1.6 ใช้ชิป ESP32 (มี Wi-Fi และ Bluetooth ในตัว), จอ LED Dot Matrix 16×8, เซนเซอร์อุณหภูมิ/แสง, MPU-6050, buzzer, Gerora RGB LED 6 หลอด, ปุ่มกด 2 ปุ่ม, RTC, พอร์ต Micro USB สำหรับจ่ายไฟและอัปโหลดโปรแกรม, และพอร์ตขยาย GPIO (I2C, UART, ADC/DAC)

หลักการทำงานตามหน้าสินค้า: เขียนบล็อกใน KidBright IDE → คอมไพล์และอัปโหลดผ่าน Micro USB เข้า Flash ของ ESP32 → บอร์ดอ่านเซนเซอร์และควบคุมเอาต์พุตตามตรรกะโปรแกรม

หน้าสินค้ายังระบุว่า **สามารถใช้กับบอร์ด KB Robot เพื่อสร้างหุ่นยนต์ โดยสื่อสารผ่านสาย KB Chain เพียงเส้นเดียว**

ที่มา: [kidbright.io — KIDBRIGHT32 V1.6](https://www.kidbright.io/product-page/kidbright32-v1-6)

ดาวน์โหลด IDE (อ้างในปลั๊กอิน KB Chain): [kid-bright.org/file/download](https://www.kid-bright.org/file/download/)

### 1.3 โมเดลบล็อกสำหรับหุ่นยนต์ (แนวปฏิบัติจากคู่มือ INEX JR-BOT)

คู่มือกิจกรรม KidBright32iA JR-BOT ของ INEX แนะนำให้จัดกลุ่มการเคลื่อนที่เป็นฟังก์ชันบล็อกในแถบ Advance เช่น Forward / Backward / Left / Right / Stop แล้วเรียกใช้จากลูปหลัก — เหมาะเป็นแบบอย่างโครงสร้างบล็อกแม้โครงงานไฮบัสจะใช้ฮาร์ดแวร์คนละชุด

ที่มา: [INEX — edit-Activity-KidBright32iA-JR-BOT-A4.pdf](https://inex.co.th/store/manual/edit-Activity-KidBright32iA-JR-BOT-A4.pdf)

---

## 2. KB Robot Line Tracking Kit (Gravitech)

### 2.1 สิ่งที่หน้าสินค้าชุดยืนยันได้ในรอบนี้

URL สินค้า: [store.gravitechthai.com — KB Robot Line Tracking Kit](https://store.gravitechthai.com/product/kb-robot-line-tracking-kit/11001005073000628)

จาก `meta description` / `og:description` ของหน้าสินค้า:

> KB ROBOT LINE TRACKING KIT ชุด Robot Car Tracking เป็นรถโรบอทคาร์ ที่มีส่วนการขับเคลื่อนสองแบบคือ หนึ่ง ขับเคลื่อนแบบใช้ IR Infrared Sensor แบบที่สอง …

ข้อสรุปที่อ้างจาก meta นี้ได้โดยตรง:

| ข้อ | สถานะ |
| --- | --- |
| เป็นชุด Robot Car Tracking สำหรับตามเส้นด้วย **IR Infrared Sensor** | ยืนยันจาก meta |
| มี **สองโหมดขับเคลื่อน**; โหมดแรกคือ IR | ยืนยันจาก meta |
| ชื่อโหมดที่สองใน meta ถูกตัดด้วย `...` ใน HTML ที่ดึงได้รอบนี้ | **ไม่ยืนยันชื่อโหมดที่สองจากข้อความเต็มในรอบนี้** |
| รายการชิ้นส่วนแบบ numbered BOM (มอเตอร์กี่ตัว, เซนเซอร์กี่ตัว, สาย, ถ่าน) | **ไม่พบรายการชิ้นส่วนครบในเนื้อหาที่ดึงได้จาก SPA ของหน้าร้าน** |

บันทึกใน [RESEARCH.md](./RESEARCH.md) เคยสรุปจากหน้าเดียวกันว่ามีโหมดตามเส้นกับโหมดบังคับผ่านบลูทูธ และใช้ KB Chain motor ขับมอเตอร์สองตัว — ให้ถือเป็นบันทึกโครงงานเดิม แต่ถ้าต้องอ้าง “แหล่งปฐมภูมิรอบนี้” ให้ยึด meta IR + สองโหมด และเติมรายละเอียดมอเตอร์จากหน้าสินค้า KB Chain Motor / KB Robot ที่แยกต่างหากด้านล่าง

### 2.2 บอร์ดขับมอเตอร์ที่เกี่ยวกับระบบนิเวศชุดนี้

**KB Chain 2-CH 1A DC Motor Driver** (ชิป DRV8830 / MiniMoto, I2C):

- H-Bridge Voltage-Controlled Motor Driver  
- Peak drive current 1 A  
- แรงดันใช้งาน 2.7 V ถึง 6.8 V  
- อินเทอร์เฟซ I2C; dataline รองรับได้ถึง 9 MiniMotos  

ที่มา:

- [kidbright.io — KB Chain 2-CH 1A DC Motor Driver](https://www.kidbright.io/product-page/kb-chain-2-ch-1a-dc-motor-driver)  
- [GitHub — gravitech-engineer/KB_Chain_Motor README](https://github.com/gravitech-engineer/KB_Chain_Motor)

**KB Robot Extension Board** (บอร์ดหุ่นยนต์ของ Gravitech; คนละ SKU กับ Line Tracking Kit แต่เป็นฮาร์ดแวร์ที่เกี่ยวข้องในระบบนิเวศ):

- เชื่อม KidBright Chain / Chili / Grove  
- ขับ DC Motor 5 V ได้ 2 ช่อง  
- รับถ่าน LiPo 3.7 V มี Boost ไฟมอเตอร์ 5 V 1 A และชาร์จผ่าน microUSB ได้  
- I/O 8 ช่อง (digital หรือ analog)  

ที่มา: [store.gravitechthai.com — KB Robot Extension Board](https://store.gravitechthai.com/product/kb-robot-extension-board-for-kidbright-and-chili-v1-1/11001005073000629)  
และ README ปลั๊กอิน: [GitHub — gravitech-engineer/KB_ROBOT](https://github.com/gravitech-engineer/KB_ROBOT) (ระบุ 2× bi-directional brushed DC motor, 1 A limited each, 8-bit PWM)

### 2.3 เซนเซอร์ IR ที่ขายในร้านเดียวกัน (อ้างเป็นชิ้นส่วนที่เกี่ยวกับตามเส้น — ไม่ใช่ BOM ชุด Line Tracking ที่นับชิ้นได้)

**3-CH Infrared Line Tracking Module** (Gravitech): เซนเซอร์ IR 3 ช่อง (ซ้าย/กลาง/ขวา) สำหรับเส้นดำบนพื้นขาว (หรือกลับกัน); เอาต์พุตดิจิทัล HIGH/LOW; มีโพเทนชิออมิเตอร์ปรับความไว

ที่มา: [store.gravitechthai.com — 3-CH Infrared Line Tracking Module](https://store.gravitechthai.com/product/3-ch-infrared-line-tracking-module/11001005073002440)

### 2.4 หมายเหตุไฟเลี้ยง (power notes)

- ไดรเวอร์ KB Chain Motor: 2.7–6.8 V, peak 1 A — อย่าเกินย่านนี้  
  ที่มา: [KB_Chain_Motor README](https://github.com/gravitech-engineer/KB_Chain_Motor)
- KB Robot Extension: แยกจ่ายไฟมอเตอร์ผ่าน LiPo + Boost 5 V 1 A เพราะมอเตอร์กินไฟมากกว่าที่บอร์ดหลักจ่ายได้โดยตรง  
  ที่มา: [KB Robot Extension Board](https://store.gravitechthai.com/product/kb-robot-extension-board-for-kidbright-and-chili-v1-1/11001005073000629)
- KB Chain 5-CH Hub: ขยายพอร์ต KB Chain และรับไฟภายนอกผ่าน Micro USB Type B เมื่อโมดูลต้องการไฟเกินที่ KidBright32 จ่าย  
  ที่มา: [store.gravitechthai.com — KB Chain 5-CH Hub](https://store.gravitechthai.com/product/kb-chain-5-ch-hub/11001005073001186)
- KidBright32 เองรับไฟและอัปโหลดผ่าน Micro USB  
  ที่มา: [KIDBRIGHT32 V1.6](https://www.kidbright.io/product-page/kidbright32-v1-6)

### 2.5 สิ่งที่ชุดนี้ **ไม่ได้** ระบุว่ามี

- ไม่ระบุสัญลักษณ์ป้ายรถเมล์ / อัลกอริทึมจอดสถานีสำเร็จรูป (สอดคล้อง RESEARCH.md และ `infographic.html` §03)  
- ไม่พบรายการชิ้นส่วนครบในข้อความที่ดึงได้รอบนี้ — ห้ามอ้าง BOM ชุดแบบ “รวม X ชิ้น” โดยไม่มีรายการจากผู้ขาย

---

## 3. สถาปัตยกรรมอ้างอิงทางเลือก: KidBright JR-BOT + ZX-03

ใช้เป็น **reference architecture** ของการตามเส้นด้วย IR สองตัว + บล็อก KidBright IDE — **ไม่ใช่ชุดเดียวกับ KB Robot Line Tracking Kit ของ Gravitech**

### 3.1 รายการในชุด JR-BOT (INEX)

หน้าสินค้าระบุรายการรวม: โครงหุ่นยนต์พร้อมกะบะถ่าน, KidBright32iA, ฐานรอง, ZX-SONAR1M, **ZX-03 × 2**, KSERVO-360J × 2, ล้อ, ล้ออิสระ, ฮาร์ดแวร์ยึด, คู่มือ ฯลฯ  
มีมินิบอร์ด IR สำหรับตรวจจับพื้นที่และเส้น และโมดูลอัลตร้าโซนิก

ที่มา: [inex.co.th — KidBright 32iA JR-BOT](https://inex.co.th/home/product/kidbright-32ia-jr-bot/)

### 3.2 การเดินสาย (คู่มือประกอบ)

จากคู่มือประกอบหน้าเดียวของ INEX:

| อุปกรณ์ | จุดต่อ |
| --- | --- |
| ZX-SONAR1M | I2 |
| ZX-03 ซ้าย | I4 |
| ZX-03 ขวา | I3 |
| KSERVO-360J ซ้าย | O1 |
| KSERVO-360J ขวา | O2 |
| สาย KB CHAIN | ระหว่าง KidBright32iA กับจุดต่อบนโครง |

ที่มา: [Building-KidBrightJR-Robot-edit-P8.pdf](https://inex.co.th/store/manual/Building-KidBrightJR-Robot-edit-P8.pdf)

### 3.3 ZX-03 คืออะไร

แผงวงจรตรวจจับแสงสะท้อนอินฟราเรด ใช้โมดูล TCRT5000 (LED IR + โฟโต้ทรานซิสเตอร์); ค่าที่ขา S ขึ้นกับความเข้มแสงสะท้อน

ที่มา: [inex.co.th — ZX-03](https://inex.co.th/home/product/zx-03/)

### 3.4 ตรรกะตามเส้นจากคู่มือกิจกรรม (ค่าอ้างอิง 2000)

คู่มือ JR-BOT กำหนด threshold ประมาณ 2000 สำหรับ ZX-03:

- L > 2000 และ R > 2000 → พื้นขาว → Forward  
- L < 2000 และ R > 2000 → เส้นดำทางซ้าย → Left  
- L > 2000 และ R < 2000 → เส้นดำทางขวา → Right  
- ทั้งสองตัวพบดำ → เส้นตัด/ทางแยก → มีทางเลือกอย่างน้อย 4 แบบ (วิ่งตรงข้าม, เลี้ยวซ้าย, เลี้ยวขวา, ถอยแล้วหมุนกลับ)

ที่มา: [edit-Activity-KidBright32iA-JR-BOT-A4.pdf](https://inex.co.th/store/manual/edit-Activity-KidBright32iA-JR-BOT-A4.pdf)

เอกสาร INEX เรื่อง POP-X2 Rover ยังอธิบายแนวคิดเซนเซอร์ 2 ตัว + เงื่อนไขเมื่อเจอเส้นตัด (หยุด / ตรง / เลี้ยวซ้าย / เลี้ยวขวา) ซึ่งสอดคล้องกับแนวทางด้านบน  
ที่มา: [doc.inex.co.th — POP-X2 Rover บทที่ 6](https://doc.inex.co.th/pop-x2-rover-ep6/)

---

## 4. ปลั๊กอิน KB Chain สำหรับมอเตอร์และเซนเซอร์

คลังปลั๊กอินอย่างเป็นทางการของผู้พัฒนา Gravitech:

ที่มาหลัก: [GitHub — gravitech-engineer/Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain)

### 4.1 รายการปลั๊กอินใน README

รวมถึง (ไม่ครบทุกชิ้นในประโยคเดียว): KB Chain Motor, Ultrasonic, IR Receiver, 16-CH IO Extension, 4-CH 12-BIT ADC, Battery, Relay 2CH, OLED, RGB, Compass, Keypad, 7Segment, Force Sensor ฯลฯ

### 4.2 วิธีติดตั้ง (ตาม README)

1. ติดตั้ง KidBright IDE ล่าสุดจาก [kid-bright.org/file/download](https://www.kid-bright.org/file/download/)  
2. ดาวน์โหลดปลั๊กอินจาก GitHub  
3. ใน IDE: **Plugins → Install Plugins** แล้วเลือกไฟล์  
4. เปิด IDE ใหม่ — ปลั๊กอินอยู่แถบเครื่องมือด้านซ้ายล่าง  

### 4.3 มอเตอร์โดยเฉพาะ

- ปลั๊กอิน Motor อยู่ในคลังรวมด้านบน  
- เอกสารฮาร์ดแวร์/สเปก: [KB_Chain_Motor](https://github.com/gravitech-engineer/KB_Chain_Motor)  
- หน้าดาวน์โหลดเอกสาร KB Chain ของผู้ผลิต: [kidbright.io/download](https://www.kidbright.io/download) (มีรายการ 2-CH 1A DC Motor Driver)

### 4.4 ทางเลือกปลั๊กอินขับมอเตอร์คนละรุ่น (อย่าสับสนกับ KB Chain)

KidMotor V3 บน KidStore มีบล็อกวิ่งหน้า/ถอย/เลี้ยว/หยุด, ล็อกซ้าย-ขวาหมุน, อ่านดิจิทัล/แอนะล็อก D1–D5 — เป็นบอร์ดขับคนละรุ่น ไม่ได้แปลว่าโครงงานไฮบัสล็อกกับบอร์ดนั้น

ที่มา: [store.kidbright.info — KidMotor V3](https://store.kidbright.info/plugin/46/KidMotor+V3)

---

## 5. วิธีจอดป้าย (station-stop) ที่ใช้ได้กับเซนเซอร์ IR บนแทร็กขาว–ดำ

### 5.1 สิ่งที่ชุดพาณิชย์ให้ vs กติกาโครงงาน

| แหล่ง | มีอะไร | ไม่มีอะไร |
| --- | --- | --- |
| KB Robot Line Tracking Kit (meta) | โหมดตามเส้นด้วย IR (+ โหมดที่สองที่ meta ตัดข้อความ) | ไม่ระบุป้ายจอด / สถานี |
| JR-BOT + คู่มือ INEX | ตามเส้น, ตรวจเส้นตัด, หยุดเมื่อพบดำตามเงื่อนไขตัวอย่าง, อัลตร้าโซนิกหลบสิ่งกีดขวาง | ไม่ได้กำหนด “ป้ายรถเมล์ไฮบัส” |
| ปลั๊กอิน ZX-RFID / ฮาร์ดแวร์ RFID | อ่าน UID บัตรเมื่อแตะ | ไม่ได้อยู่ในชุด Line Tracking Kit |
| **โครงงานไฮบัส** (`infographic.html` §03, RESEARCH.md) | กำหนดสัญลักษณ์ป้ายบนเส้น (เช่น แถบพิเศษ); เมื่อตรวจพบ → หยุดมอเตอร์; ตัวถังยกสูงประกอบเอง; แอปแยกจากรถ | — |

ข้อความบนหน้าภาพรวม: *“การออกแบบและปฏิบัติตามเงื่อนไขป้ายหยุดรถ … เป็นกติกาการทำงานเพิ่มเติมที่ผู้พัฒนากำหนดขึ้นเอง”* และแหล่งอ้างอิงชุดอุปกรณ์ไม่ได้รวมฟีเจอร์ป้ายสำเร็จรูป

### 5.2 วิธีที่เหมาะกับ IR บนแทร็กขาว–ดำ (เรียงจากง่ายไปซับซ้อน)

| วิธี | หลักการ | ฮาร์ดแวร์เพิ่ม | ความเหมาะสมสาธิต ม.3 | หมายเหตุแหล่ง |
| --- | --- | --- | --- | --- |
| **A. แถบตั้งฉาก / เส้นตัด (perpendicular bar)** | เมื่อ IR ซ้าย+ขวาพบดำพร้อมกัน = เครื่องหมายป้าย → หยุด → รอ → เดินต่อ | ไม่เพิ่ม (ใช้เซนเซอร์ตามเส้นเดิม) | **แนะนำเป็นค่าเริ่มต้น** | คู่มือ JR-BOT และ POP-X2 อธิบายกรณีทั้งสองตัวพบดำว่าเป็นเส้นตัด/ทางแยก และให้เลือกหยุดหรือข้ามได้ — การแมปเป็น “ป้าย” เป็นกติกาโครงงาน |
| **B. เครื่องหมายหนาขึ้น (thicker mark)** | แถบดำกว้างกว่าเส้นทางปกติ เพื่อให้หน้าต่างเวลาอ่านค่าเสถียรขึ้น | ไม่เพิ่ม | ดีมากคู่กับ A | กติกาแทร็กโครงงาน; หลัก IR ดูดกลืน/สะท้อนจากหน้าสินค้า 3-CH IR และ ZX-03 |
| **C. แพทเทิร์นสองเซนเซอร์เฉพาะ** | เช่น แถบสั้นซ้าย-ขวาเป็นจังหวะ หรือแถบคู่ที่เส้นตามทางไม่ทำให้เกิด | ไม่เพิ่ม | ใช้ได้ถ้าควบคุมการวาดแทร็กได้ | ต่อยอดจากเงื่อนไข L/R ในคู่มือ JR-BOT |
| **D. เซนเซอร์ตัวที่สาม (กลางหรือช่องแยก)** | ช่องกลาง/ตัวที่สามอ่านเฉพาะเครื่องหมายป้ายที่กว้างกว่าเส้น | โมดูล 3-CH IR หรือ ZX-03 เพิ่ม | ดีเมื่อต้องการแยก “อยู่บนเส้น” กับ “เจอป้าย” | [3-CH Infrared Line Tracking Module](https://store.gravitechthai.com/product/3-ch-infrared-line-tracking-module/11001005073002440) |
| **E. RFID/NFC landmark** | วางแท็กที่ป้าย; เมื่ออ่าน UID ที่กำหนด → หยุด | ZX-RFID (RC522) + ปลั๊กอิน; หรือ ZX-RFID Reader (PN532) | อัปเกรด; แพงและตั้งค่ายากกว่า | [KidStore ZX-RFID](https://store.kidbright.info/plugin/55/ZX-RFID+%E0%B9%82%E0%B8%A1%E0%B8%94%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3+RFID); [INEX ZX-RFID Reader](https://inex.co.th/home/product/zx-rfid-reader-mini-rfid-reader/) |
| **F. อัลตร้าโซนิก landmark** | เสา/แผงข้างทางที่ระยะคงที่; อ่านระยะแล้วหยุด | ZX-SONAR1M หรือปลั๊กอิน KB Chain Ultrasonic | ใช้ได้แต่เสี่ยงสัญญาณรบกวนเวที | [ZX-SONAR1M](https://inex.co.th/home/product/zx-sonar1m/); ปลั๊กอิน Ultrasonic ใน [Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain); JR-BOT ใช้ SONAR ที่ I2 สำหรับหลบสิ่งกีดขวาง |
| **G. หยุดตามเวลา (timed stop)** | หลังออกตัวรอ N วินาทีแล้วหยุด | ไม่เพิ่ม | ง่ายแต่ไม่ robust บนเวทีจริง | ใช้บล็อกหน่วงเวลาของ IDE ได้ แต่ **ไม่แนะนำเป็นวิธีหลักของสาธิตป้าย** เพราะไม่ผูกกับตำแหน่งจริง |

**คำแนะนำโครงงานไฮบัส:** ใช้ **A + B** (แถบตั้งฉากหนาบนเส้นดำ) เป็น MVP ให้สอดคล้องกับแผนภาพใน `infographic.html` §03 (เส้นทาง + แถบป้าย) จากนั้นถ้าสาธิตล้มเหลวเพราะสับสนกับทางแยก ให้ย้ายไป **D**

---

## 6. วัสดุโครง/ตัวถังสำหรับสาธิตรถโดยสารยกสูง (ช่องลอดใต้ท้อง)

### 6.1 ข้อกำหนดจากโครงงาน (ไม่ใช่สเปกชุด)

จาก `infographic.html` §03: โครงสร้างตัวถังยกสูงเป็น **Custom Elevated Frame** ประกอบเอง เพื่อจำลองช่องลอดด้านใต้ — **ไม่อยู่ในชุดอุปกรณ์มาตรฐาน**

เป้าหมายสาธิต: ช่องว่างใต้ท้องพอให้โมเดลรถเล็กผ่านได้ โดยยังทรงตัวและไม่บังเซนเซอร์ IR ที่หันลงพื้น

### 6.2 วัสดุและวิธีที่พบในระบบนิเวศไทย / เวิร์กช็อปโรงเรียน

| วัสดุ | ข้อดีสำหรับไฮบัสยกสูง | ข้อควรระวัง | ที่มาที่เกี่ยวข้อง |
| --- | --- | --- | --- |
| **อะคริลิก (acrylic) ตัดเลเซอร์** | แข็ง โปร่ง โชว์ช่องลอดได้ชัด; ยึดด้วยสกรู/เสารองได้ | ต้องมีเครื่องตัดเลเซอร์หรือสั่งตัด | Gravitech ระบุบริการ Laser Cutting: Acrylic ในศูนย์ RICH/Makerspace ของบริษัท ([เกี่ยวกับร้านในหน้า store](https://store.gravitechthai.com/product/kb-robot-line-tracking-kit/11001005073000628) ส่วน About / timeline บริการ Prototype); ชุมชนมีรายการ “แจกไฟล์เคส KidBright Acrylic สำหรับตัดเลเซอร์” ใน [kidbright.info](https://kidbright.info/) |
| **โฟมบอร์ด / โฟมยาง** | หาง่ายในโรงเรียน ตัดด้วยคัตเตอร์ เบา | แข็งน้อย; ต้องเสริมเสา | **คำแนะนำโครงงาน** สำหรับเวิร์กช็อป ม.ต้น (ไม่ใช่สเปกผู้ผลิตชุด) |
| **พลาสติกลูกฟูก / คอร์รูเกต (พลาสวูด)** | เบา กันน้ำพอประมาณ ตัดกรรไกร/คัตเตอร์ | ขอบคม; ยึดด้วยซิลิโคน/สกรูสั้น | **คำแนะนำโครงงาน** |
| **ไม้อัดบาง / ไม้ไอติม + กาวร้อน** | ใช้ในห้องปฏิบัติการช่างทั่วไป | น้ำหนักและเศษไม้ | **คำแนะนำโครงงาน** |
| **เสารองโลหะ/พลาสติก + สกรู** (เช่นที่ใช้ใน JR-BOT) | ตั้งระยะเซนเซอร์และยกพื้นได้มาตรฐาน | ต้องจัดระยะไม่ให้ IR สูงเกินระยะสะท้อน | รายการเสารองใน [JR-BOT](https://inex.co.th/home/product/kidbright-32ia-jr-bot/); คู่มือ POP-X2 ติดตั้ง ZX-03 บนเสา 25 มม. ([doc.inex.co.th](https://doc.inex.co.th/pop-x2-rover-ep6/)) |

### 6.3 แนวประกอบที่แนะนำสำหรับสาธิตโรงเรียน

1. **ชั้นล่าง (drivetrain):** ฐานล้อ + มอเตอร์ + IR หันลงพื้น ระยะเซนเซอร์ให้ใกล้ค่าที่คู่มืออ้าง (ระดับเสารองสั้น)  
2. **เสายก (standoffs):** 4 ต้น กำหนดความสูงช่องลอดตามโมเดลรถเล็กที่ใช้สาธิต  
3. **ชั้นบน (cabin mockup):** โฟมบอร์ดหรืออะคริลิกบางรูปทรงรถเมล์ — น้ำหนักเบา ศูนย์ถ่วงไม่สูงเกินจนพลิก  
4. อย่าปิดกั้นมุมมองด้านข้างของช่องลอด — จุดขายของแนวคิดไฮบัสคือการให้รถเตี้ยลอดใต้ได้ (`infographic.html` §01–02)

---

## 7. BOM ที่แนะนำ

### 7.1 Minimum viable prototype (MVP)

| # | รายการ | บทบาท | ที่มา / หมายเหตุ |
| --- | --- | --- | --- |
| 1 | KidBright32 (เช่น V1.6) | สมองควบคุม + อัปโหลด USB | [kidbright.io V1.6](https://www.kidbright.io/product-page/kidbright32-v1-6) |
| 2 | สาย Micro USB | จ่ายไฟตอนพัฒนา / อัปโหลด | หน้าสินค้า V1.6 |
| 3 | KB Chain 2-CH 1A DC Motor Driver + สาย 5-pin KB Chain | ขับมอเตอร์ 2 ช่องผ่าน I2C | [Motor Driver](https://www.kidbright.io/product-page/kb-chain-2-ch-1a-dc-motor-driver); [Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain) |
| 4 | มอเตอร์ DC + ล้อ 2 ชุด (+ ล้ออิสระ) | ขับเคลื่อน | สเปกไดรเวอร์รองรับหุ่นยนต์ขนาดเล็ก 2.7–6.8 V / 1 A peak |
| 5 | เซนเซอร์ IR ตามเส้น ≥ 2 ช่อง (หรือโมดูล 3-CH) | ตามเส้น + ตรวจแถบป้าย | meta ชุด Line Tracking ([ลิงก์ชุด](https://store.gravitechthai.com/product/kb-robot-line-tracking-kit/11001005073000628)); หรือ [3-CH IR](https://store.gravitechthai.com/product/3-ch-infrared-line-tracking-module/11001005073002440); อ้างอิง ZX-03 ([INEX](https://inex.co.th/home/product/zx-03/)) |
| 6 | แหล่งจ่ายแยกสำหรับมอเตอร์ (ถ่าน/LiPo ในย่านไดรเวอร์) | กันแรงดันตกตอนสตาร์ท | สเปก Motor Driver + แนวทางแยกไฟของ [KB Robot Extension](https://store.gravitechthai.com/product/kb-robot-extension-board-for-kidbright-and-chili-v1-1/11001005073000629) |
| 7 | โครงยกสูงประกอบเอง (โฟมบอร์ด/คอร์รูเกต/อะคริลิก + เสารอง) | จำลองช่องลอด | กติกาโครงงาน — ไม่รวมในชุด (§6) |
| 8 | สนามแทร็กขาว–ดำ + **แถบป้ายตั้งฉากหนา** | ตามเส้นและจอดป้าย | กติกาโครงงาน (§5) |
| 9 | ปลั๊กอิน KB Chain Motor ใน KidBright IDE | บล็อกสั่งมอเตอร์ | [Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain) |

ทางลัดจัดซื้อ: ใช้ **KB Robot Line Tracking Kit** เป็นฐานขับเคลื่อน+IR ถ้าหาซื้อได้ แล้ว **เพิ่มโครงยกสูงและแถบป้ายเอง** — แต่ยังต้องมีบอร์ด KidBright แยกถ้าชุดไม่รวม (หน้าสินค้าชุดไม่ได้ยืนยันรายการครบในรอบนี้)

### 7.2 อัปเกรดทางเลือก

| อัปเกรด | เหตุผล | ที่มา |
| --- | --- | --- |
| โมดูล IR ช่องที่ 3 / 3-CH | แยกป้ายจากเส้นทาง | [3-CH IR](https://store.gravitechthai.com/product/3-ch-infrared-line-tracking-module/11001005073002440) |
| KB Chain 5-CH Hub + ไฟนอก | ต่อหลายโมดูลและจ่ายไฟเสถียร | [5-CH Hub](https://store.gravitechthai.com/product/kb-chain-5-ch-hub/11001005073001186) |
| ZX-RFID + ปลั๊กอิน | ป้ายเป็นแท็ก UID | [KidStore ZX-RFID](https://store.kidbright.info/plugin/55/ZX-RFID+%E0%B9%82%E0%B8%A1%E0%B8%94%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3+RFID) |
| ZX-SONAR1M หรือ KB Chain Ultrasonic | landmark / กันชน | [ZX-SONAR1M](https://inex.co.th/home/product/zx-sonar1m/); [Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain) |
| ตัวถังอะคริลิกตัดเลเซอร์ | โชว์ช่องลอดชัดบนเวที | บริการตัดอะคริลิกในระบบนิเวศ Gravitech; ไฟล์เคสชุมชนบน [kidbright.info](https://kidbright.info/) |
| OLED / Dot Matrix แสดงชื่อป้าย | สื่อสารตอนหยุด | ปลั๊กอิน OLED ใน KB Chain; จอในตัวบน KidBright32 |

---

## 8. โครงอัลกอริทึมควบคุม (ภาษาบล็อก) + โหมดล้มเหลว

สอดคล้อง `infographic.html` §03: ตามเส้น → ตรวจแถบป้าย → หยุด → (สาธิต) แล้วเดินต่อโดยไม่เลี้ยวออกนอกเส้น

### 8.1 โครงบล็อกแนะนำ (MVP: เซนเซอร์ 2 ตัว + แถบตั้งฉาก)

```
เมื่อเริ่มต้น / รอ กด Switch1
ตั้งตัวแปร state = "FOLLOW"
ตั้งตัวแปร pause_ms = 2000   // เวลจอดป้ายสาธิต

วนซ้ำตลอด (Forever):
  อ่าน L, R จากเซนเซอร์ IR
  ถ้า state = "FOLLOW":
    ถ้า L เป็นดำ และ R เป็นดำ:          // แถบป้าย / เส้นตัด
      หยุดมอเตอร์ทั้งสอง
      แสดงข้อความ/เสียงสั้น ๆ (optional)
      หน่วงเวลา pause_ms
      ตั้งตัวแปร state = "LEAVE_MARK"
    ไม่เช่นนั้นถ้า L ขาว และ R ขาว:
      มอเตอร์ซ้าย = ความเร็ว V, มอเตอร์ขวา = V     // ตรง
    ไม่เช่นนั้นถ้า L ดำ และ R ขาว:
      ลดความเร็วล้อซ้าย / เลี้ยวซ้าย               // ประคองเข้าเส้น
    ไม่เช่นนั้นถ้า L ขาว และ R ดำ:
      ลดความเร็วล้อขวา / เลี้ยวขวา
  ถ้า state = "LEAVE_MARK":
    // เดินตรงสั้น ๆ จนพ้นแถบ แล้วกลับโหมดตามเส้น
    มอเตอร์ทั้งคู่ = V_slow
    หน่วงเวลา t_clear
    ตั้งตัวแปร state = "FOLLOW"
```

การแมป “ดำ/ขาว” ให้คาลิเบรตจริงบนแทร็กวันสาธิต (คู่มือ JR-BOT ใช้เกณฑ์ ~2000 สำหรับ ZX-03 — ค่านี้เป็นของ ZX-03 ไม่ใช่สเปกสากลของทุกโมดูล IR)

อ้างอิงโครงสร้างฟังก์ชัน Forward/Left/Right/Stop และเงื่อนไข L/R: [JR-BOT activity PDF](https://inex.co.th/store/manual/edit-Activity-KidBright32iA-JR-BOT-A4.pdf)  
สั่งมอเตอร์ผ่านปลั๊กอิน: [Plugins_KB_Chain](https://github.com/gravitech-engineer/Plugins_KB_Chain)

### 8.2 โหมดล้มเหลว (failure modes) ที่ควรทดสอบ

| อาการ | สาเหตุที่เป็นไปได้ | การแก้เชิงสาธิต |
| --- | --- | --- |
| ไม่อยู่บนเส้น / ส่าย | ความเร็วสูง, เกณฑ์ IR ผิด, แสงห้อง | ลด V; คาลิเบรต threshold; บังแสง |
| หยุดกลางเส้นทาง | เส้นทางหนาเกินไป / คราบดำ | ใช้เส้นบางสม่ำเสมอ; แถบป้ายหนาเฉพาะจุด |
| ไม่หยุดที่ป้าย | แถบบางเกิน / ความเร็วสูงจนข้าม | ทำแถบหนาขึ้น (วิธี B); ลดความเร็วก่อนเข้าป้าย |
| หยุดแล้วไม่เดินต่อ | ไม่มีสถานะ LEAVE_MARK | ใส่ช่วงวิ่งตรงพ้นแถบก่อนกลับ FOLLOW |
| สับสนทางแยกกับป้าย | รูปแบบดำเหมือนกัน | ใช้เซนเซอร์ตัวที่ 3 หรือแพทเทิร์นเฉพาะป้าย |
| มอเตอร์กระตุก / รีเซ็ตบอร์ด | ไฟมอเตอร์ดึงจากบอร์ดหลัก | แยกแหล่งจ่าย; ตรวจย่าน 2.7–6.8 V / ≤1 A |
| ตัวถังพลิกตอนเลี้ยว | ศูนย์ถ่วงสูง | ลดความสูงหรือน้ำหนักห้องโดยสารจำลอง |
| กรรมการเข้าใจว่าแอปสั่งรถ | สื่อสารไม่ชัด | ย้ำว่าแอปกับบอร์ดแยกกัน (§9) |

---

## 9. สิ่งที่ห้ามอ้าง / ห้ามเขียนเกินแหล่ง

1. **ห้าม** บอกว่าชุด KB Robot Line Tracking Kit มีฟีเจอร์ป้ายรถเมล์หรือจอดสถานีสำเร็จรูป — เอกสารผู้ผลิตที่ตรวจแล้วไม่ระบุ; เป็นกติกาโครงงาน ([ชุด](https://store.gravitechthai.com/product/kb-robot-line-tracking-kit/11001005073000628), RESEARCH.md, `infographic.html` §03)  
2. **ห้าม** บอกว่าแอปนำทางกับบอร์ด KidBright บนรถเชื่อมข้อมูลกัน — กติกาโครงงานระบุว่าแยกอิสระ และตัวเลขในแอปมาจากฐานข้อมูลจำลอง (`infographic.html` §01, §04, คำถามกรรมการข้อ 4)  
3. **ห้าม** อ้างรายการชิ้นส่วนชุด Line Tracking แบบครบชิ้น ถ้ายังไม่มีรายการจากหน้าสินค้า/คู่มือผู้ผลิตที่สมบูรณ์ (รอบนี้ meta ยืนยันเฉพาะโหมด IR + สองโหมด)  
4. **ห้าม** ระบุขา GPIO ของต้นแบบกลุ่มโดยไม่มีแผนวงจรของกลุ่ม (RESEARCH.md)  
5. **ห้าม** อ้างว่าช่องลอดใต้รถยกสูงทำให้การจราจรหายไปทั้งเมือง หรือว่ารถสูงเกินช่องลอดผ่านได้ — ข้อจำกัดระบบอยู่ในหน้าภาพรวม  
6. **ห้าม** สับสน KidMotor V3 / JR-BOT / KB Robot Extension ว่าเป็นชุดเดียวกัน — เป็นฮาร์ดแวร์คนละ SKU แม้ใช้ KidBright IDE ร่วมกันได้  
7. ชื่อบอร์ดคือ **KidBright** ไม่ใช่ BrightKid (RESEARCH.md)

---

## 10. แหล่งปฐมภูมิที่ใช้ในเอกสารนี้ (ดัชนี URL)

| หัวข้อ | URL |
| --- | --- |
| NECTEC KidBright | https://kid-bright.org/kidbright-en/ |
| NSTDA archive | https://www.nstda.or.th/archives/kidbright-3/ |
| Community index | https://kidbright.info/ |
| IDE download | https://www.kid-bright.org/file/download/ |
| KidBright32 V1.6 | https://www.kidbright.io/product-page/kidbright32-v1-6 |
| Line Tracking Kit | https://store.gravitechthai.com/product/kb-robot-line-tracking-kit/11001005073000628 |
| KB Chain Motor (shop) | https://www.kidbright.io/product-page/kb-chain-2-ch-1a-dc-motor-driver |
| KB Chain Motor (GitHub) | https://github.com/gravitech-engineer/KB_Chain_Motor |
| Plugins KB Chain | https://github.com/gravitech-engineer/Plugins_KB_Chain |
| KB Robot Extension | https://store.gravitechthai.com/product/kb-robot-extension-board-for-kidbright-and-chili-v1-1/11001005073000629 |
| KB_ROBOT plugin README | https://github.com/gravitech-engineer/KB_ROBOT |
| 3-CH IR module | https://store.gravitechthai.com/product/3-ch-infrared-line-tracking-module/11001005073002440 |
| KB Chain Hub | https://store.gravitechthai.com/product/kb-chain-5-ch-hub/11001005073001186 |
| KB Chain docs page | https://www.kidbright.io/download |
| KidMotor V3 | https://store.kidbright.info/plugin/46/KidMotor+V3 |
| JR-BOT product | https://inex.co.th/home/product/kidbright-32ia-jr-bot/ |
| JR-BOT wiring PDF | https://inex.co.th/store/manual/Building-KidBrightJR-Robot-edit-P8.pdf |
| JR-BOT activity PDF | https://inex.co.th/store/manual/edit-Activity-KidBright32iA-JR-BOT-A4.pdf |
| ZX-03 | https://inex.co.th/home/product/zx-03/ |
| ZX-SONAR1M | https://inex.co.th/home/product/zx-sonar1m/ |
| POP-X2 line follow | https://doc.inex.co.th/pop-x2-rover-ep6/ |
| ZX-RFID plugin | https://store.kidbright.info/plugin/55/ZX-RFID+%E0%B9%82%E0%B8%A1%E0%B8%94%E0%B8%B9%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3+RFID |
| ZX-RFID Reader (PN532) | https://inex.co.th/home/product/zx-rfid-reader-mini-rfid-reader/ |

---

*อัปเดตรอบค้น: ใช้เฉพาะแหล่งปฐมภูมิด้านบน; ส่วนที่เป็นกติกาโครงงานไฮบัสระบุชัดว่าไม่ใช่สเปกผู้ผลิต*
