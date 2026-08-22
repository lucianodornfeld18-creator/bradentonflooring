Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$imageDirectory = Join-Path $projectRoot 'images'
$logoPath = Join-Path $imageDirectory 'bradenton-flooring-logo.png'

$cards = @(
  @{ File = 'flooring-installation-social-card.png'; Title = 'Flooring Installation'; Subtitle = 'Bradenton | Lakewood Ranch | Sarasota'; Accent = '#C6A24F' },
  @{ File = 'luxury-vinyl-plank-social-card.png'; Title = 'Luxury Vinyl Plank'; Subtitle = 'SPC | WPC | Slab Preparation'; Accent = '#D5B96E' },
  @{ File = 'tile-installation-social-card.png'; Title = 'Tile Installation'; Subtitle = 'Porcelain | Ceramic | Wet Areas'; Accent = '#B98C3D' },
  @{ File = 'hardwood-flooring-social-card.png'; Title = 'Hardwood Flooring'; Subtitle = 'Engineered Wood | Florida Slabs'; Accent = '#C39455' },
  @{ File = 'laminate-flooring-social-card.png'; Title = 'Laminate Flooring'; Subtitle = 'AC-Rated | Water-Resistant'; Accent = '#D0AA55' },
  @{ File = 'carpet-installation-social-card.png'; Title = 'Carpet Installation'; Subtitle = 'Bedrooms | Stairs | Quiet Comfort'; Accent = '#BDA35F' },
  @{ File = 'commercial-flooring-social-card.png'; Title = 'Commercial Flooring'; Subtitle = 'Office | Retail | Medical | Hospitality'; Accent = '#C2A568' },
  @{ File = 'flooring-guides-social-card.png'; Title = 'Florida Flooring Guides'; Subtitle = 'Costs | Materials | Preparation | Timelines'; Accent = '#D2B66D' }
)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = [System.Drawing.StringAlignment]::Near
$format.LineAlignment = [System.Drawing.StringAlignment]::Center

try {
  foreach ($card in $cards) {
    $bitmap = [System.Drawing.Bitmap]::new(1200, 630)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    try {
      $background = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#F7F4ED'))
      $ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#17191A'))
      $muted = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#625E57'))
      $accent = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($card.Accent))
      $dark = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#202224'))
      $panel = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#FFFEFB'))
      $linePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(32, 146, 113, 38), 2)

      try {
        $graphics.FillRectangle($background, 0, 0, 1200, 630)
        $graphics.FillRectangle($dark, 0, 0, 1200, 124)
        $graphics.FillRectangle($accent, 0, 124, 1200, 9)

        for ($x = 650; $x -lt 1320; $x += 92) {
          $graphics.DrawLine($linePen, $x, 133, $x - 220, 630)
        }
        for ($y = 232; $y -lt 630; $y += 74) {
          $graphics.DrawLine($linePen, 650, $y, 1200, $y)
        }

        $graphics.FillRectangle($panel, 58, 31, 390, 88)
        $logoScale = [Math]::Min(360 / $logo.Width, 70 / $logo.Height)
        $logoWidth = [int]($logo.Width * $logoScale)
        $logoHeight = [int]($logo.Height * $logoScale)
        $graphics.DrawImage($logo, 74, 40, $logoWidth, $logoHeight)

        $titleFont = [System.Drawing.Font]::new('Georgia', 47, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
        $subtitleFont = [System.Drawing.Font]::new('Segoe UI', 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
        $labelFont = [System.Drawing.Font]::new('Segoe UI', 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
        try {
          $graphics.DrawString('BRADENTON FLOORING', $labelFont, $muted, [System.Drawing.RectangleF]::new(72, 178, 700, 36), $format)
          $graphics.DrawString($card.Title, $titleFont, $ink, [System.Drawing.RectangleF]::new(68, 220, 720, 135), $format)
          $graphics.FillRectangle($accent, 72, 374, 112, 7)
          $graphics.DrawString($card.Subtitle, $subtitleFont, $muted, [System.Drawing.RectangleF]::new(70, 405, 760, 70), $format)
          $graphics.DrawString('47-Point Coastal Subfloor & Install Protocol', $labelFont, $ink, [System.Drawing.RectangleF]::new(70, 505, 780, 55), $format)
          $graphics.DrawString('(941) 274-5560  |  bradentonflooring.com', $labelFont, $muted, [System.Drawing.RectangleF]::new(70, 557, 800, 40), $format)
        }
        finally {
          $titleFont.Dispose()
          $subtitleFont.Dispose()
          $labelFont.Dispose()
        }
      }
      finally {
        $background.Dispose()
        $ink.Dispose()
        $muted.Dispose()
        $accent.Dispose()
        $dark.Dispose()
        $panel.Dispose()
        $linePen.Dispose()
      }

      $outputPath = Join-Path $imageDirectory $card.File
      $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
      Write-Output $outputPath
    }
    finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }

  $favicon = [System.Drawing.Bitmap]::new(128, 128)
  $faviconGraphics = [System.Drawing.Graphics]::FromImage($favicon)
  try {
    $faviconGraphics.Clear([System.Drawing.Color]::FromArgb(247, 244, 237))
    $faviconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $faviconGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $faviconGraphics.DrawImage(
      $logo,
      [System.Drawing.Rectangle]::new(4, 4, 120, 120),
      [System.Drawing.Rectangle]::new(0, 0, 724, 724),
      [System.Drawing.GraphicsUnit]::Pixel
    )
    $favicon.Save((Join-Path $imageDirectory 'favicon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $faviconGraphics.Dispose()
    $favicon.Dispose()
  }
}
finally {
  $format.Dispose()
  $logo.Dispose()
}
