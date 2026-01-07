# Coding Assistant Setup Guide

This guide explains how to set up and configure AI coding assistants (RooCode) for this project using AWS Bedrock, including security best practices and performance optimizations.

Note: we use Openrouter configs here not AWS Bedrock, so slight deviations in roo setup might occur.

## Table of Contents

- [Installing RooCode](#installing-roocode)
- [AWS Bedrock Configuration](#aws-bedrock-configuration)
- [Model Selection Guide](#model-selection-guide)
- [Security Configuration (.rooignore)](#security-configuration-rooignore)
- [AI Guidance Rules (.roo/rules)](#ai-guidance-rules-roorules)
- [Best Practices](#best-practices)

---

## Installing RooCode

RooCode is an AI-powered coding assistant that integrates directly into VS Code, providing context-aware help for development tasks.

### Prerequisites

- **VS Code** version 1.80.0 or higher
- **Internet connection** for AWS Bedrock access
- **AWS Bedrock API Key** (provided by your team lead)

### Installation Steps

#### 1. Install the Extension

**VS Code Marketplace**

1. Open VS Code
2. Press `Cmd+Shift+X` (macOS) or `Ctrl+Shift+X` (Windows/Linux) to open Extensions
3. Search for "Roo Code" or "Roo-Cline"
4. Click **Install** on the official RooCode extension
5. Reload VS Code when prompted

#### 2. Open RooCode Panel

- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Roo: Open Panel" and press Enter
- Or click the RooCode icon in the VS Code sidebar

#### 3. Verify Installation

After configuration (see next section), test with a simple request:
```
What files are in this project?
```

The assistant should respond with information about your project structure.

---

## AWS Bedrock Configuration

This project uses **AWS Bedrock** as the AI provider. You will need the API key provided by your team.

### Step-by-Step Setup

#### 1. Open Provider Settings

In the RooCode panel, click the **gear icon** ⚙️ to open settings, then navigate to **Providers**.

#### 2. Create Configuration Profiles

We recommend creating **two profiles** - one for each model:

##### Profile 1: AO Bedrock - Sonnet (Daily Development)

| Setting | Value |
|---------|-------|
| **Configuration Profile** | `AO Bedrock - Sonnet` |
| **API Provider** | `Amazon Bedrock` |
| **Authentication Method** | `Amazon Bedrock API Key` |
| **Amazon Bedrock API Key** | *(paste the key provided by your team)* |
| **AWS Region** | `eu-north-1` |
| **Model** | `anthropic.claude-sonnet-4-5-20250929-v1:0` |

**Enable these options:**
- ✅ Use Global inference (auto-select optimal AWS Region)
- ✅ Use cross-region inference
- ✅ Enable prompt caching

**Leave unchecked:**
- ☐ Use custom VPC endpoint
- ☐ Enable 1M context window (Beta)

##### Profile 2: AO Bedrock - Opus (Complex Tasks)

| Setting | Value |
|---------|-------|
| **Configuration Profile** | `AO Bedrock - Opus` |
| **API Provider** | `Amazon Bedrock` |
| **Authentication Method** | `Amazon Bedrock API Key` |
| **Amazon Bedrock API Key** | *(paste the key provided by your team)* |
| **AWS Region** | `eu-north-1` |
| **Model** | `anthropic.claude-opus-4-5-20251101-v1:0` |

**Enable these options:**
- ✅ Use Global inference (auto-select optimal AWS Region)
- ✅ Use cross-region inference
- ✅ Enable prompt caching
- ✅ **Enable reasoning** *(important for Opus)*

**Leave unchecked:**
- ☐ Use custom VPC endpoint
- ☐ Enable 1M context window (Beta)

**Max Tokens:** Set to `63488` for extended output

#### 3. Save Profiles

Click the Save button to save each profile. You can switch between profiles using the dropdown menu.

### Visual Configuration Reference

Your Sonnet configuration should look like this:

```
┌─────────────────────────────────────────────────────────────┐
│ Configuration Profile: AO Bedrock - Sonnet           [▼][+]│
├─────────────────────────────────────────────────────────────┤
│ API Provider:           Amazon Bedrock                      │
│ Authentication Method:  Amazon Bedrock API Key              │
│ Amazon Bedrock API Key: ••••••••••••••••••••                │
│ AWS Region:             eu-north-1                          │
│                                                             │
│ ☑ Use Global inference (auto-select optimal AWS Region)    │
│ ☑ Use cross-region inference                                │
│ ☑ Enable prompt caching                                     │
│ ☐ Use custom VPC endpoint                                   │
│                                                             │
│ Model: anthropic.claude-sonnet-4-5-20250929-v1:0           │
│                                                             │
│ Context Window: 200,000 tokens                              │
│ Max output: 8,192 tokens                                    │
│ ✓ Supports images                                           │
│ ✓ Supports prompt caching                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Model Selection Guide

### Quick Reference

| Use Case | Recommended Model | Why |
|----------|-------------------|-----|
| Daily coding tasks | **Sonnet 4.5** | Fast, cost-effective, excellent for most tasks |
| Simple file edits | **Sonnet 4.5** | Quick responses, lower cost |
| Code reviews | **Sonnet 4.5** | Fast analysis with good accuracy |
| Bug fixes | **Sonnet 4.5** | Efficient for targeted changes |
| Complex architecture | **Opus 4.5** | Deep reasoning for system design |
| Large refactoring | **Opus 4.5** | Better understanding of wide context |
| Debugging difficult issues | **Opus 4.5** | Extended reasoning capability |
| Writing documentation | **Sonnet 4.5** | Fast and capable for text |

### Claude Sonnet 4.5 (Default Choice)

**Model ID:** `anthropic.claude-sonnet-4-5-20250929-v1:0`

**Best for:**
- ✅ Everyday development tasks
- ✅ Writing and modifying code
- ✅ Code reviews and explanations
- ✅ Simple to moderate bug fixes
- ✅ Writing tests
- ✅ Documentation and comments
- ✅ Quick iterations

**Characteristics:**
- Fast response times
- Lower cost per token
- Excellent for most programming tasks
- Context window: 200,000 tokens
- Output: 8,192 tokens max

**Cost:** ~$3.00 input / $15.00 output per 1M tokens

### Claude Opus 4.5 (Complex Tasks)

**Model ID:** `anthropic.claude-opus-4-5-20251101-v1:0`

**Best for:**
- ✅ Complex architectural decisions
- ✅ Large-scale refactoring
- ✅ Debugging intricate issues
- ✅ Multi-file coordinated changes
- ✅ System design and planning
- ✅ Tasks requiring deep reasoning

**Characteristics:**
- Extended reasoning capability (enable "Enable reasoning" checkbox)
- Better at maintaining context across complex tasks
- More thorough analysis
- Context window: 200,000 tokens
- Output: 8,192 tokens max (can extend with Max Tokens slider)

**Cost:** ~$5.00 input / $25.00 output per 1M tokens

### Recommended Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    START NEW TASK                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Is this task complex? │
              │  - Architecture design │
              │  - Large refactoring   │
              │  - Difficult debugging │
              └────────────────────────┘
                    │           │
                   NO          YES
                    │           │
                    ▼           ▼
         ┌──────────────┐ ┌──────────────┐
         │ Use SONNET   │ │ Use OPUS     │
         │ (Default)    │ │ + Reasoning  │
         └──────────────┘ └──────────────┘
                    │           │
                    ▼           ▼
              ┌────────────────────────┐
              │   Complete the task    │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Switch back to SONNET  │
              │ for follow-up tasks    │
              └────────────────────────┘
```

### Switching Between Models

1. Click the **Configuration Profile** dropdown in RooCode settings
2. Select `AO Bedrock - Sonnet` or `AO Bedrock - Opus`
3. The switch is immediate - no restart needed

**💡 Tip:** Start with Sonnet. If you find the AI struggling with a complex task, switch to Opus for that specific task, then switch back to Sonnet.

---

## Security Configuration (.rooignore)

The `.rooignore` file prevents AI assistants from accessing sensitive files. This is **critical** for security.

### Why Use .rooignore?

1. **Protect Secrets**: Prevent AI from reading API keys, passwords, and credentials
2. **Prevent Data Leakage**: Keep sensitive business data from being sent to AI providers
3. **Compliance**: Meet security requirements for handling sensitive information
4. **Token Efficiency**: Reduce unnecessary context that consumes API tokens

### Creating .rooignore

Create a `.rooignore` file in your project root:

```bash
touch .rooignore
```

### Essential Patterns for This Project

```gitignore
# ============================================
# SENSITIVE FILES - DO NOT ACCESS
# ============================================

# Environment files with secrets
*.env
.env.*
!.env.example
!.env.*.example

# Private keys and certificates
*.pem
*.key
*.p12
*.pfx
id_rsa*
*.crt

# Credentials and tokens
**/credentials.json
**/secrets.json
**/tokens.json
.netrc
.npmrc

# Cloud provider configs with credentials
.aws/credentials
.azure/
.gcloud/

# ============================================
# LARGE/BINARY FILES - NOT USEFUL FOR AI
# ============================================

# Build artifacts
bin/
dist/
build/
*.exe
*.dll
*.so
*.dylib

# Dependencies (too large, not project-specific)
node_modules/
vendor/

# Test coverage reports
coverage/
*.cover
*.out

# IDE/Editor files
.idea/
.vscode/settings.json
*.swp
*.swo

# ============================================
# GENERATED FILES
# ============================================

# Generated code
*_gen.go
*.pb.go
*_mock.go

# Lock files (usually not needed for context)
package-lock.json
yarn.lock
go.sum
```

### Syntax Reference

| Pattern | Description | Example Match |
|---------|-------------|---------------|
| `*.env` | All .env files | `.env`, `prod.env` |
| `.env.*` | Files starting with .env. | `.env.local`, `.env.production` |
| `!.env.example` | Exception - allow this file | `.env.example` |
| `**/secrets.json` | Any secrets.json in any directory | `config/secrets.json` |
| `bin/` | Entire bin directory | `bin/app`, `bin/test` |
| `*.pem` | All PEM files | `cert.pem`, `key.pem` |

### Verification

When RooCode lists files, ignored files will show a 🔒 icon:

```
├── .env              🔒
├── .env.example      ✓
├── config.json       ✓
└── secrets.json      🔒
```

If the AI tries to read an ignored file, it will receive an error instead of the content.

---

## AI Guidance Rules (.roo/rules)

The `.roo/rules/` directory contains markdown files that provide context and guidelines to AI assistants. This helps the AI understand your project without parsing every file.

### Why Use Rules?

1. **Efficiency**: AI gets instant context without scanning the entire codebase
2. **Consistency**: Ensures AI follows your team's conventions
3. **Accuracy**: Prevents AI from making incorrect assumptions
4. **Speed**: Reduces token usage and response time

### Directory Structure

```
.roo/
└── rules/
    ├── 01-command-hierarchy.md      # Command execution priorities
    ├── 02-makefile-reference.md     # Available make targets
    ├── 03-project-architecture.md   # Code structure and layers
    ├── 04-troubleshooting.md        # Common issues and fixes
    ├── 05-go-best-practices.md      # Language-specific guidelines
    └── 06-e2e-testing.md            # Testing procedures
```

### Rule File Naming Convention

- Use numbered prefixes (01-, 02-) for ordering
- Use descriptive, lowercase names with hyphens
- Use `.md` extension for markdown formatting

### Creating Effective Rules

#### Template Structure

```markdown
# Rule Title

## Overview
Brief description of what this rule covers.

## Quick Reference
Tables or lists for fast lookup.

## Detailed Guidelines
Expanded explanations with examples.

## Examples
```code examples```

## Common Mistakes
What to avoid.
```

#### Example: Architecture Rule

```markdown
# Project Architecture Rules

## Code Layers

| Layer | Directory | Modify? |
|-------|-----------|---------|
| Shell | `internal/`, `main.go` | ❌ NO |
| Business | `pkg/processor/` | ✅ YES |
| Config | `.env` files | ✅ YES |

## Key Principle
Only modify files in `pkg/processor/`. The shell layer handles infrastructure.
```

### Rules in This Project

This project includes pre-configured rules:

| Rule File | Purpose |
|-----------|---------|
| [`01-command-hierarchy.md`](../.roo/rules/01-command-hierarchy.md) | Use `make` commands first, then scripts |
| [`02-makefile-reference.md`](../.roo/rules/02-makefile-reference.md) | All available make targets |
| [`03-project-architecture.md`](../.roo/rules/03-project-architecture.md) | What code to modify vs. leave alone |
| [`04-troubleshooting.md`](../.roo/rules/04-troubleshooting.md) | Common issues and solutions |
| [`05-go-best-practices.md`](../.roo/rules/05-go-best-practices.md) | Go coding standards for this project |
| [`06-e2e-testing.md`](../.roo/rules/06-e2e-testing.md) | How to run E2E tests |

---

## Best Practices

### 1. Security First

```gitignore
# ALWAYS ignore these in .rooignore
*.env
*.pem
*.key
**/credentials.json
**/secrets.json
```

**Never commit secrets**. Even with `.rooignore`, ensure `.gitignore` also excludes sensitive files.

### 2. Keep Rules Concise

❌ **Bad**: 500-line rule file with every possible scenario

✅ **Good**: Focused rules with quick reference tables

```markdown
# Command Reference

| Task | Command |
|------|---------|
| Start | `make docker-up` |
| Stop | `make docker-down` |
| Test | `make test` |
```

### 3. Update Rules When Project Changes

When you:
- Add new make targets → Update `02-makefile-reference.md`
- Change architecture → Update `03-project-architecture.md`
- Find new issues → Update `04-troubleshooting.md`

### 4. Use Consistent Formatting

```markdown
## Section Header

### Subsection

| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |

```bash
# Code blocks with language hints
make test
```
```

### 5. Include "Do Not Modify" Sections

Clearly mark code the AI should not touch:

```markdown
## 🚫 DO NOT MODIFY

- `internal/` - Infrastructure code
- `main.go` - Entry point
- `docker-compose.yaml` - Unless specifically requested
```

### 6. Provide Context, Not Implementation

Rules should explain **what** and **why**, not exhaustive **how**:

❌ **Bad**: Full implementation details of every function

✅ **Good**: 
```markdown
## Transform Method
Implement your business logic in `pkg/processor/processor.go`.
The shell layer handles Kafka, logging, and error handling.
```

### 7. Test Your Rules

After adding or modifying rules:

1. Start a new RooCode session
2. Ask a question related to the rule
3. Verify the AI follows the guidance

Example test:
```
How do I start the services?
```

Expected response should mention `make docker-up` (from command hierarchy rule).

### 8. Version Control Your Configuration

```bash
# Track these files in git
git add .rooignore
git add .roo/rules/*.md
git commit -m "Add AI coding assistant configuration"
```

### 9. Team Synchronization

- Document rule changes in PR descriptions
- Review `.roo/rules` changes like code changes
- Maintain a CHANGELOG for significant rule updates

### 10. Performance Optimization

Keep the AI context lean:

```gitignore
# In .rooignore - reduce unnecessary parsing

# Large generated files
*.pb.go
*_gen.go

# Dependencies
vendor/
node_modules/

# Build outputs
bin/
dist/
```

---

## Troubleshooting

### AI Ignores Rules

**Cause**: Rules not loaded or formatted incorrectly

**Solution**:
1. Verify files are in `.roo/rules/`
2. Check markdown syntax
3. Restart VS Code / RooCode session

### AI Reads Sensitive Files

**Cause**: Pattern not matching in `.rooignore`

**Solution**:
1. Test pattern with `ls` or `find`:
   ```bash
   # Test if pattern matches
   find . -name "*.env" -type f
   ```
2. Add more specific patterns
3. Verify file shows 🔒 in file list

### AI Makes Wrong Assumptions

**Cause**: Missing or outdated rules

**Solution**:
1. Add clarifying rules
2. Update existing rules with correct information
3. Be explicit about project-specific conventions

---

## Quick Setup Checklist

- [ ] Install RooCode extension
- [ ] Configure API provider
- [ ] Create `.rooignore` with sensitive file patterns
- [ ] Verify `.env` files are ignored
- [ ] Review existing `.roo/rules/` files
- [ ] Test AI responses follow rules
- [ ] Commit configuration to version control

---

## Additional Resources

- [RooCode Documentation](https://docs.roocode.com/)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/)
- [Project Architecture](ARCHITECTURE.md)
- [Getting Started](GETTING_STARTED.md)