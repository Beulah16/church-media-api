
import { config } from 'dotenv';
config();

export const welcomeEmailTemplate = (userName: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome</title>
    <style>
      body, html {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
      }

      .center-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 20px;
        box-sizing: border-box;
      }

      .container {
        width: 100%;
        max-width: 600px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .header {
        background: url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
        background-size: cover;
        height: 200px;
      }

      .content {
        padding: 20px;
        text-align: center;
      }

      h1 {
        color: #2d7d46;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        margin: 10px 0;
      }

      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background-color: #4CAF50;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #888;
        padding: 20px;
      }

      @media (max-width: 600px) {
        h1 { font-size: 22px; }
        .btn { width: 80%; display: block; margin: 20px auto 0; }
      }
    </style>
  </head>
  <body>
    <div class="center-wrapper">
      <div class="container">
        <div class="header"></div>
        <div class="content">
          <h1>Welcome, ${userName}!</h1>
          <p>We're excited to have you on board. Let's get started!</p>
          <a href="https://yourapp.com/login" class="btn">Login Now</a>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ${process.env.APP_NAME}, All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>
`;

