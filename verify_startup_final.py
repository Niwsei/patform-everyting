from playwright.sync_api import sync_playwright, expect

def verify_startup_final(page):
    # 1. Home Page
    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000) # Give more time for Hydration
    page.screenshot(path="/home/jules/verification/home_page.png")

    # 2. Open Chat using CSS selector for the widget button
    page.click("button >> .lucide-message-square")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/chat_open.png")

    # 3. Explore Properties
    page.goto("http://localhost:3000/properties")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/map_view.png")

    # 4. Property Detail
    page.click("text=View Listing >> nth=0")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/property_detail.png")

    # 5. Booking Flow
    page.click("text=Reserve This Nest")
    page.wait_for_timeout(1000)
    page.click("text=Continue")
    page.wait_for_timeout(500)
    page.click("text=Almost there")
    page.wait_for_timeout(1000)
    page.click("text=Confirm Booking Request")
    page.wait_for_timeout(4000) # Wait for simulation
    page.screenshot(path="/home/jules/verification/booking_success.png")

    # 6. Dashboard
    page.click("text=Go to My Dashboard")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/dashboard.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800},
            record_video_dir="/home/jules/verification/video"
        )
        page = context.new_page()
        try:
            verify_startup_final(page)
        finally:
            context.close()
            browser.close()
