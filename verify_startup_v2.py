from playwright.sync_api import sync_playwright, expect

def verify_startup_v2(page):
    # 1. Home Page & Mobile Check
    page.goto("http://localhost:3000")
    page.wait_for_timeout(5000)
    page.screenshot(path="/home/jules/verification/v2_home_mobile.png")

    # Check Bottom Nav (it should be visible on 390x844 viewport)
    expect(page.get_by_text("Explore", exact=True)).to_be_visible()

    # 2. Partner Onboarding Flow
    page.goto("http://localhost:3000/onboarding")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v2_onboarding_start.png")

    # Select Property
    page.click("text=Property")
    page.click("text=Continue")
    page.wait_for_timeout(1000)

    # Step 2: Fill details
    page.fill('input[placeholder="Modern Studio in Xaysetha"]', "My Awesome Nest")
    page.screenshot(path="/home/jules/verification/v2_onboarding_step2.png")
    page.click("text=Next Step")
    page.wait_for_timeout(1000)

    # Step 3: Success
    expect(page.locator("text=Application Submitted!")).to_be_visible()
    page.screenshot(path="/home/jules/verification/v2_onboarding_success.png")

    # 3. Dashboard Partner Sections
    page.goto("http://localhost:3000/dashboard")
    page.wait_for_timeout(2000)

    # Click My Properties
    page.get_by_role("link", name="My Properties").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v2_dashboard_properties.png")
    expect(page.get_by_role("heading", name="My Properties")).to_be_visible()

    # Click My Services
    page.goto("http://localhost:3000/dashboard/services")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/v2_dashboard_services.png")
    expect(page.get_by_role("heading", name="My Services")).to_be_visible()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            is_mobile=True,
            record_video_dir="/home/jules/verification/video_v2"
        )
        page = context.new_page()
        try:
            verify_startup_v2(page)
        finally:
            context.close()
            browser.close()
