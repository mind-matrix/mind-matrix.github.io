---
layout: "../../layouts/BlogPost.astro"
title: A Guide to Unit Testing
created: 2026-01-11
pubDate: "Jan 11, 2026"
cover: https://res.cloudinary.com/mind-matrix/image/upload/v1597060891/blinken_iu5aw6.jpg
description: A developer's retrospective on unit testing
---

## Glossary

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Term</th>
      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Unit Test</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A test that verifies the behavior of a single component or function in isolation</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Integration Test</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A test that verifies the interaction between multiple components or systems</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Test Coverage</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A metric that measures the percentage of code executed during testing</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Mock</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A test double that simulates the behavior of real objects in controlled ways</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Assertion</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A statement that checks if a condition is true during test execution</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Test Suite</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A collection of test cases that are executed together</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Test Case</td>
      <td style="border: 1px solid #ddd; padding: 8px;">A specific scenario or condition being tested</td>
    </tr>
  </tbody>
</table>

## Key Concepts

### Test Driven Development

Test Driven Development (TDD) is a software development methodology that emphasizes writing tests before writing the actual code. This approach fundamentally changes how developers think about and approach problem-solving.

#### The TDD Cycle: Red-Green-Refactor

TDD follows a simple three-step cycle:

1. **Red**: Write a failing test that describes the desired functionality
2. **Green**: Write the minimal code necessary to make the test pass
3. **Refactor**: Improve the code while keeping all tests passing

This cycle is repeated for each small piece of functionality, creating a rhythm of development that ensures comprehensive test coverage and clean, maintainable code.

## Introduction

Unit Tests provide the most fundamental validations in the modern distributed, serverless, GPT-driven development era where changes are rapid, pipelines are always failing and the leads want everything automated with a state-of-the-art AI model. However, having complete code coverage is not the same as ensuring the best possible validation mechanisms. And it is very easy, even at enterprise levels, to get stuck in the repetitive loop of having to constantly update tests with every minor code change. In this article, I am going to share some of my learnings working with unit tests and hopefully convince you to do the same. Feel free to disagree in the comments and maybe I'll learn a thing or two as well!

## Should I even Unit Tests?

Developers have been very opinionated in terms of what testing strategy they use since a very long time. So I cannot say this without rustling some feathers, but here it goes - if you are working with a team on a complex software that you have plans to scale to potentially hundreds or more customers, then you should absolutely write unit tests! In my mind, there are no two ways about it. Unit Tests are your first line of defence against incorrect logic OR logic used in an incorrect ways resulting in a broken service to your customers.

Now, I have heard a lot of developers complain how unit tests are not a representation of customer-perspective and therefore, do nothing to ensure a good customer experience. I think it is mostly because of the following reasons that people are led to believe this -
1. Most of the tests they have seen are brain-dead post-facto slop written with the sole purpose of increasing code coverage because leadership wants 90% coverage on the package with a green check-mark next to because it's a placebo for them to sleep easy at night.
2. Each Unit Tests seems to be too low-level to achieve anything valuable. Most unit tests only focus on a single method, function, etc. which is a very small part of a much larger picture - the picture which governs your customer journey.

For 1, the simple fact is that lack of knowledge (or motivation) to write "good" tests is an effect of the cause that "Product wants this yesterday". The skills necessary to push back on such tasks, to stand your ground and just say "no" is something that not every developer knows or sometimes, can even afford to do. There are real people with real jobs that earn them a living and I understand that sometimes, you just gotta listen to the system. Hence, this is out of scope for the current discussion - and we just conclude with the fact that better unit tests exist and can be done theoretically.

For 2, yes unit tests are low-level, yes they mostly just test a single function, but if even your foundations are not solid, then what are you really building? I acknowledge the fact that things can get complicated really quickly when you have to navigate dozens of tests to understand the core logic. But that is where other tools come in to fill the gap.

### Importance of a good Design

As a developer, I think the following steps in the Design phase of software development are absolutely non-negotiable -

1. The first task of a developer, even before writing a single line of code, is to write a Design Document. To do that, they must first understand the exact Business Requirements.
2. Converting the Business Requirements to Functional Requirements ensures that all business logic is captured as requirements.
3. Writing a design that addresses all the functional requirements, annotated with well-thought class and sequence diagrams ensures that one business logic doesn't conflicts with another, and that the solution is scalable, maintainable, etc.
4. Reviewing the design with peers, Product and other stakeholders solidifies the design and ensure no corner cases are missed and that all requirements are thought through.

As part of your design, you would (or should) be writing a lot of throw-away code, trying to check if the various parts of your architecture work, but with every iteration you'll be getting closer and closer to a final solution that you can be happy with. When all of that is done, and the dust has settled, you'll have a Design that translates to code as smoothly as honey in lukewarm water. And then, when you're coding your low-level components you can focus on the unit tests thoroughly without ever losing track of the bigger picture because your Design already ensures that.

## A guide to testing

The following outlines some guidelines that I personally found to be beneficial to keep in mind when writing unit tests.

## Test behaviour, not code

A good unit test does not test methods, data, etc. Instead, it tests behaviour. It will be more apparent once we get to some examples what that actually means. But following this methodology ensures our tests are not brittle -i.e, they don't break with every minor code change.

## Privates are not your friend

Using private methods, members, etc. in your unit tests set you up for failure in the long-term. I have seen developers "friend"-ing private C++ class methods left and right just to test those methods with made-up inputs.

![funny.gif](https://media.tenor.com/E-qulHT5geEAAAAM/funny.gif)

The consumers of your class (maybe yourself) will be passing their data to your public methods. By writing tests for your private methods, you're violating the first principle of testing behaviour rather than code. Every private method exists to be called in either another private method or a public method. So if you test all possible arguments to your public methods, you'll automagically get private method coverage for free! And guess what? You'll also get branch coverage as an added benefit! The public methods represent what services your class has to offer to it's consumers and hence by only testing public methods, you'll also find it easy to shift to a mentality of behaviour-oriented tests. 

### Breaking Bad - Unit Test Edition

Let me show you why testing private methods creates maintenance nightmares. Consider a simple payment processor written in C++:

```cpp
// PaymentProcessor.h - Version 1.0 (Simple validation)
class PaymentRequest {
public:
    std::string cardNumber;
    double amount;
    std::string currency;
};

class PaymentResult {
public:
    bool success;
    std::string errorCode;
    std::string transactionId;
};

class PaymentProcessor {
private:
    bool validateCreditCard(const std::string& cardNumber) const {
        return cardNumber.length() == 16;  // Simple validation
    }

    bool executePayment(const PaymentRequest& request) {
        // Simulate payment processing
        if (request.amount <= 0) {
            return false;
        }
        return PaymentGateway::pay(request);
    }
    
public:
    PaymentResult processPayment(const PaymentRequest& request) {
        if (!validateCreditCard(request.cardNumber)) {
            return {false, "INVALID_CARD", ""};
        }
        
        if (!executePayment(request)) {
            return {false, "PAYMENT_REJECTED", ""};
        }
        
        return {true, "", "TXN_" + std::to_string(rand())};
    }

    // ❌ BAD: Your teammate added this for "complete code coverage"
    friend class PaymentProcessorTest;
};
```

Your teammate writes brittle tests for private methods with minimal public method testing:

```cpp
class PaymentProcessorTest {
private:
    PaymentProcessor* processor;

public:
    void SetUp() {
        processor = new PaymentProcessor();
    }

    // ❌ BAD: Testing private method directly
    void testValidateCardNumber() {
        // Testing private method with friend access
        assert(processor->validateCreditCard("1234567890123456") == true);
        assert(processor->validateCreditCard("12345") == false);
        assert(processor->validateCreditCard("") == false);
        
        // "Great! 100% coverage of validateCreditCard!"
    }

    // ❌ BAD: Testing another private method
    void testExecutePayment() {
        PaymentRequest request{"1234567890123456", 100.0, "USD"};
        
        // Testing private method directly
        assert(processor->executePayment(request) == true);
        
        request.amount = -50.0;
        assert(processor->executePayment(request) == false);
        
        // "Awesome! 100% coverage of executePayment too!"
    }

    // ❌ MINIMAL: Only one basic test for public method
    void testProcessPayment() {
        PaymentRequest request{"4111111111111111", 100.0, "USD"};
        PaymentResult result = processor->processPayment(request);
        
        assert(result.success == true);
        // "Good enough, we already tested the private methods!"
    }
};
```

Six months later - business wants you to add Luhn Algorithm for Checksum validation and a new Fraud Detection method.

```cpp
// PaymentProcessor.h - Version 2.0 (Enhanced validation)
class PaymentProcessor {
private:
    // ❌ BREAKING: Private methods completely changed!
    bool validateCardFormat(const std::string& cardNumber) const {
        return cardNumber.length() >= 13 && cardNumber.length() <= 19;
    }
    
    bool validateLuhnChecksum(const std::string& cardNumber) const {
        // Luhn algorithm implementation
    }
    
    bool checkFraudRisk(const PaymentRequest& request) const {
        // Fraud detection logic calls an API with request and returns true if no potential fraud detected, false otherwise
    }

    bool executeSecurePayment(const PaymentRequest& request) {
        return request.amount > 0 && checkFraudRisk(request) && PaymentGateway::pay(request);
    }
    
public:
    PaymentResult processPayment(const PaymentRequest& request) {
        if (!validateCardFormat(request.cardNumber)) {
            return {false, "INVALID_CARD_FORMAT", ""};
        }
        
        if (!validateLuhnChecksum(request.cardNumber)) {
            return {false, "INVALID_CARD_CHECKSUM", ""};
        }
        
        if (!executeSecurePayment(request)) {
            return {false, "PAYMENT_REJECTED", ""};
        }
        
        return {true, "", "TXN_" + std::to_string(rand())};
    }

    friend class PaymentProcessorTest;  // Still causing problems
};
```

Now all your private method tests start failing and pipeline is blocked, and your timeline gets delayed by 2 whole days because you have to re-write all your tests.

```cpp
class PaymentProcessorTest {
public:
    void testValidateCardNumber() {
        // ❌ COMPILE ERROR: validateCreditCard() no longer exists!
        // ❌ The method was split into validateCardFormat() and validateLuhnChecksum()
        // ❌ Must completely rewrite this test
    }

    void testExecutePayment() {
        // ❌ COMPILE ERROR: executePayment() no longer exists!
        // ❌ Now called executeSecurePayment() with different logic
        // ❌ Must completely rewrite this test too
    }

    void testProcessPayment() {
        // ❌ This test passes but misses critical bugs!
        // ⚠️ Card "4111111111111111" has valid Luhn checksum, but there might be others which aren't
        // ❌ Test should fail but our minimal testing didn't catch it
        PaymentRequest request{"4111111111111111", 100.0, "USD"};
        PaymentResult result = processor->processPayment(request);
        
        // This will now FAIL in production but our test didn't catch it!
        assert(result.success == true);
    }
};
```

This would not have happened if your teammate hadn't given in to the temptation of befriending private methods when writing their unit tests. Here is how instead you could have written the unit tests using parameterized inputs to ONLY your public method -

```cpp
// Using parameterized tests for comprehensive coverage
class PaymentProcessorTest : public ::testing::TestWithParam<PaymentTestCase> {
private:
    PaymentProcessor* processor;

public:
    void SetUp() override {
        processor = new PaymentProcessor();
    }
};

struct PaymentTestCase {
    std::string cardNumber;
    double amount;
    std::string currency;
    bool expectedSuccess;
    std::string expectedError;
    std::string description;
};

// Comprehensive test cases covering all existing edge cases
INSTANTIATE_TEST_SUITE_P(
    PaymentValidation,
    PaymentProcessorTest,
    ::testing::Values(
        // Valid cases
        PaymentTestCase{"4111111111111111", 100.0, "USD", true, "", "Valid Visa card"},
        PaymentTestCase{"5555555555554444", 200.0, "USD", true, "", "Valid Mastercard"},
        PaymentTestCase{"378282246310005", 50.0, "USD", true, "", "Valid Amex (15 digits)"},
        PaymentTestCase{"1234567890123456", 100000.0, "USD", true, "", "Valid according to current logic"},
        PaymentTestCase{"378282246310005", 100000.0, "USD", true, "", "Valid Amount"},
        
        // Invalid case
        PaymentTestCase{"4111111111111111", -100.0, "USD", false, "PAYMENT_REJECTED", "Negative amount"},
    )
);

TEST_P(PaymentProcessorTest, ProcessPayment) {
    PaymentTestCase testCase = GetParam();
    PaymentRequest request{testCase.cardNumber, testCase.amount, testCase.currency};
    
    PaymentResult result = processor->processPayment(request);
    
    EXPECT_EQ(result.success, testCase.expectedSuccess) << testCase.description;
    
    if (!testCase.expectedSuccess) {
        EXPECT_EQ(result.errorCode, testCase.expectedError) << testCase.description;
    } else {
        EXPECT_FALSE(result.transactionId.empty()) << "Should have transaction ID: " << testCase.description;
    }
}
```

Now after introduction of the new changes for Luhn checksum and Fraud Detection, only the following 2 inputs fail -

```cpp
PaymentTestCase{"1234567890123456", 100000.0, "USD", true, "", "Valid according to current logic"}, // Now invalid because of Luhn checksum validation, so we need to update expectations.
PaymentTestCase{"378282246310005", 100000.0, "USD", true, "", "Valid Amount"}, // Now invalid due to fraud detection flagging this. Awesome!
```

Both of these failures are expected and give us confidence that our new code is working as intended. You need to update only the affected test inputs to match the updated expectations. All you need to do to ensure code coverage is just add more input parameters for the various new failure scenarios introduced.

```cpp
// Using parameterized tests for comprehensive coverage
class PaymentProcessorTest : public ::testing::TestWithParam<PaymentTestCase> {
    // ... existing implementation ...
};

// Only adding new test cases for new validations introduced
INSTANTIATE_TEST_SUITE_P(
    PaymentValidation,
    PaymentProcessorTest,
    ::testing::Values(
        // Valid cases (all but 2 of them already present)
        PaymentTestCase{"4111111111111111", 100.0, "USD", true, "", "Valid Visa card"},
        PaymentTestCase{"5555555555554444", 200.0, "USD", true, "", "Valid Mastercard"},
        PaymentTestCase{"378282246310005", 50.0, "USD", true, "", "Valid Amex (15 digits)"},
        
        // Invalid card formats
        PaymentTestCase{"12345", 100.0, "USD", false, "INVALID_CARD_FORMAT", "Too short"},
        PaymentTestCase{"12345678901234567890", 100.0, "USD", false, "INVALID_CARD_FORMAT", "Too long"},
        PaymentTestCase{"", 100.0, "USD", false, "INVALID_CARD_FORMAT", "Empty card"},
        PaymentTestCase{"abcd1111111111111", 100.0, "USD", false, "INVALID_CARD_FORMAT", "Contains letters"},
        
        // Invalid Luhn checksums (catches the bug!)
        PaymentTestCase{"1234567890123456", 100.0, "USD", false, "INVALID_CARD_CHECKSUM", "Invalid Luhn - all sequential"}, // earlier this was treated as valid, now it is an invalid checksum and hence we update the expectations
        PaymentTestCase{"4111111111111112", 100.0, "USD", false, "INVALID_CARD_CHECKSUM", "Invalid Luhn - Visa format"},
        PaymentTestCase{"5555555555554445", 100.0, "USD", false, "INVALID_CARD_CHECKSUM", "Invalid Luhn - MC format"},
        PaymentTestCase{"0000000000000000", 100.0, "USD", false, "INVALID_CARD_CHECKSUM", "All zeros"},
        
        // Fraud/amount validation
        PaymentTestCase{"4111111111111111", 100000.0, "USD", false, "PAYMENT_REJECTED", "Amount too high"}, // earlier this was a valid test case, now this is an invalid amount due to new checks, so we mark it as invalid now
    )
);

TEST_P(PaymentProcessorTest, ProcessPayment) {
    // .. existing test logic, no changes ...
}
```

Instead of you having to re-write most of your unit tests, you got to know exactly which inputs are now failing and you can judge if your new code is working correctly. You just need to add more test inputs to complete your coverage for the updated code. Awesome!

### It is okay to Mock

Now I'm aware that there are a handful of people who would disagree with this (but only a handful). But it is okay to Mock your dependencies. **YOUR DEPENDENCIES**. The only Law of Unit Testing is this -

> Thou shalt never mock the System Under Test

Now where people get it wrong is this - whether you mock your dependencies or not is completely up to you. If you feel mocking them would be easier, go ahead. If not, it's always fine to create real dependency objects. I'm more flexible here than some others because I've seen that if we apply this methodology to test all our classes, then our dependency (which could be another class in our package) can take care of it's own correctness and doesn't need to rely on your tests.

### Assert well, assert with confidence

If you are a true alpha-sigma super-human, you'll assert your inputs in your actual code 😎. But I'm not, so I write them in my unit tests.

![im-good.gif](https://media.tenor.com/FLBmfkn2QJ0AAAAM/im-good.gif)

But what I will tell is that when writing the assertions in your tests, assert as much of the output as you can. It will not improve your code coverage, but it will ensure your test checks all the right parameters that are going to be what your customers / consumers rely on.

### Write more tests than logic

If you find yourself having written 1000 input combinations for your 20 lines of code, you're on the right track! That is how you ensure your code works and you can safely move on to finding where that pesky bug hides in others code.

## Conclusion

Unit testing doesn't have to be the painful chore that makes you dread refactoring. The secret sauce? Test behavior through public interfaces with comprehensive inputs, not implementation details through private methods. Design first, test smart with parameterized cases, and don't be afraid to mock your dependencies. When you follow these principles, your tests become your safety net instead of your burden - catching real bugs while surviving the inevitable "we need to add new business logic" moments that make other developers cry. Remember: if you're writing more test cases than lines of logic, you're doing it right. Now go forth and test with confidence!
